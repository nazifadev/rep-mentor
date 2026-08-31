import { useEffect } from "react"
import { useRef } from "react"
import { useLocation } from 'react-router-dom'
import { useState } from "react"

function Camera(){
    const videoRef = useRef()
    const canvasRef = useRef()
    const repCountRef = useRef(0)
    const squatPhaseRef = useRef("up")
    const repCooldownRef = useRef(0)
    const [repCount, setRepCount] = useState(0)
    const [started, setStarted] = useState(false)

    const location = useLocation()
    const exercise = location.state?.exercise

    const [feedbackText, setFeedbackText] = useState("")
    const feedbackRef = useRef("")
    const leftAngleHistoryRef = useRef([])
    const rightAngleHistoryRef = useRef([])
    const lastSpokenRef = useRef(0)

    const playRepSound = () => {
        const audioCtx = new AudioContext()
        const oscillator = audioCtx.createOscillator()
        const gainNode = audioCtx.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioCtx.destination)
        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime)
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2)
        oscillator.start(audioCtx.currentTime)
        oscillator.stop(audioCtx.currentTime + 0.2)
    }

    useEffect(()=> {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                videoRef.current.srcObject = stream
                videoRef.current.play()
            } catch (err) {
                console.error("Camera access error", err)
            }
        }

        startCamera()

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    useEffect(() => {
        if (!started) return

        let animationId

        const initMediaPipe = async () => {
            const { PoseLandmarker, FilesetResolver, DrawingUtils } = await import('@mediapipe/tasks-vision')

            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
            )

            const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
                    delegate: 'GPU'
                },
                runningMode: 'VIDEO',
                numPoses: 1
            })

            const canvas = canvasRef.current
            const video = videoRef.current
            const ctx = canvas.getContext('2d')
            const drawingUtils = new DrawingUtils(ctx)

            const detect = () => {
                if (video.readyState >= 2) {
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight

                    const results = poseLandmarker.detectForVideo(video, performance.now())
                    ctx.clearRect(0, 0, canvas.width, canvas.height)

                    if (results.landmarks.length > 0) {
                        drawingUtils.drawLandmarks(results.landmarks[0])
                        drawingUtils.drawConnectors(results.landmarks[0], PoseLandmarker.POSE_CONNECTIONS)
                        
                        const landmarks = results.landmarks[0]
                        const leftHip = landmarks[23]
                        const leftKnee = landmarks[25]
                        const leftAnkle = landmarks[27]
                        const rightHip = landmarks[24]
                        const rightKnee = landmarks[26]
                        const rightAnkle = landmarks[28]

                        const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle)
                        const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle)

                        leftAngleHistoryRef.current.push(leftKneeAngle)
                        rightAngleHistoryRef.current.push(rightKneeAngle)

                        if (leftAngleHistoryRef.current.length > 30) leftAngleHistoryRef.current.shift()
                        if (rightAngleHistoryRef.current.length > 30) rightAngleHistoryRef.current.shift()
                        
                        const smoothedLeft = leftAngleHistoryRef.current.reduce((a, b) => a + b, 0) / leftAngleHistoryRef.current.length
                        const smoothedRight = rightAngleHistoryRef.current.reduce((a, b) => a + b, 0) / rightAngleHistoryRef.current.length

                        const avgAngle = (smoothedLeft + smoothedRight) / 2

                        let feedback = ""

                        if (squatPhaseRef.current === "up") {
                            if (Date.now() - repCooldownRef.current < 2000) {
                                feedback = ""
                            } else if (avgAngle > 150) {
                                feedback = "squat deeper"
                            } else if (avgAngle <= 150 && avgAngle > 120) {
                                feedback = "getting there, keep going"
                            } else if (avgAngle <= 120 && avgAngle >= 100) {
                                squatPhaseRef.current = "down"
                                feedback = "perfect depth"
                            } else if (avgAngle < 100) {
                                squatPhaseRef.current = "down"
                                feedback = "too low! that's not a squat"
                            }
                        } else if (squatPhaseRef.current === "down") {
                            if (avgAngle < 100) {
                                feedback = "too low! that's not a squat"
                            } else if (avgAngle >= 150) {
                                window.speechSynthesis.cancel()
                                squatPhaseRef.current = "up"
                                repCountRef.current += 1
                                setRepCount(repCountRef.current)
                                playRepSound()
                                repCooldownRef.current = Date.now()
                                feedback = ""
                            } else {
                                feedback = ""
                            }
                        }

                        if (feedback !== feedbackRef.current) {
                            feedbackRef.current = feedback
                            setFeedbackText(feedback)

                            if (feedback) {
                                const now = Date.now()
                                if (now - lastSpokenRef.current > 1000) {
                                    window.speechSynthesis.cancel()
                                    const utterance = new SpeechSynthesisUtterance(feedback)
                                    utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === "Aaron")
                                    utterance.rate = 0.9
                                    utterance.pitch = 1
                                    window.speechSynthesis.speak(utterance)
                                    lastSpokenRef.current = now
                                }
                            }
                        }
                    }
                }
                animationId = requestAnimationFrame(detect)
            }

            detect()
        }

        initMediaPipe()

        return () => {
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [started])

    const calculateAngle = (a, b, c) => {
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
        let angle = Math.abs(radians * (180 / Math.PI))
        if (angle > 180) angle = 360 - angle
        return angle
    }

return (
    <div className="w-screen min-h-screen bg-black flex flex-col items-center justify-start py-6 px-6 md:py-10 xl:py-10 gap-3 md:gap-6 overflow-hidden">
        <div className="flex flex-col items-center gap-2 px-4">
            <h1 className="text-4xl md:text-6xl xl:text-5xl font-bold text-white drop-shadow-[0_0_20px_white] text-center pt-4">
                rep-mentor
            </h1>
            <p className="text-gray-400 text-xs md:text-md tracking-widest pt-0.5 uppercase text-center">
                your real-time form coach
            </p>
            <p className="text-purple-300 font-bold text-sm md:text-[15px] tracking-widest uppercase text-center">
                {exercise}
            </p>
        </div>
        <div className="relative w-full max-w-5xl xl:max-w-5xl pt-1">
            <video 
                ref={videoRef} 
                className="w-full rounded-xl h-[570px] md:h-[700px] xl:h-[580px] object-cover"
            />
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full rounded-xl"
            />
            <div className="absolute bottom-4 left-0 w-full flex flex-col items-center gap-2">
                {!started ? (
                    <button
                        onClick={() => setStarted(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xl font-bold tracking-widest uppercase px-12 py-3 rounded-lg"
                    >
                        start
                    </button>
                ) : (
                    <>
                        <p className="text-white text-2xl font-bold tracking-widest uppercase text-center bg-black/60 px-8 py-2 rounded-lg">
                            {feedbackText}
                        </p>
                        <p className="text-white text-2xl font-bold tracking-widest uppercase text-center bg-black/60 px-8 py-2 rounded-lg">
                            reps: {repCount}
                        </p>
                    </>
                )}
                {exercise === 'squat' && (
                    <p className="text-yellow-400 text-xs tracking-widest uppercase text-center bg-black/60 px-4 py-2 rounded-lg">
                        stand facing the camera & make sure your whole body is visible
                    </p>
                )}
            </div>
        </div>
    </div>
)
}

export default Camera