import { useEffect } from "react"
import { useRef } from "react"
import { useLocation } from 'react-router-dom'
import { useState } from "react"
import { getSquatFeedback } from "../logic/squatLogic"
import { getPushupFeedback } from "../logic/pushupLogic"

function Camera(){
    const videoRef = useRef()
    const canvasRef = useRef()
    const repCountRef = useRef(0)
    const squatPhaseRef = useRef("up")
    const repCooldownRef = useRef(0)
    const [repCount, setRepCount] = useState(0)
    const [started, setStarted] = useState(false)
    const [bodyVisible, setBodyVisible] = useState(false)

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

                       const keyPoints = exercise === "push-up"
                            ? [11, 12, 13, 14, 15, 16]
                            : [23, 24, 25, 26, 27, 28]
                        const allVisible = keyPoints.every(i => landmarks[i].visibility > 0.5)
                        if (!allVisible) {
                            setBodyVisible(false)
                            if (feedbackRef.current !== "") {
                                feedbackRef.current = ""
                                setFeedbackText("")
                            }
                            animationId = requestAnimationFrame(detect)
                            return
                        }

                        setBodyVisible(true)

                        let feedback = ""

                       if (exercise === "squat") {
                        feedback = getSquatFeedback(landmarks, squatPhaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound)
                    } else if (exercise === "push-up") {
                        feedback = getPushupFeedback(landmarks, squatPhaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound)
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
                        {feedbackText && (
                            <p className="text-white text-2xl font-bold tracking-widest uppercase text-center bg-black/60 px-8 py-2 rounded-lg">
                                {feedbackText}
                            </p>
                        )}
                        {bodyVisible && (
                            <p className="text-white text-2xl font-bold tracking-widest uppercase text-center bg-black/60 px-8 py-2 rounded-lg">
                                reps: {repCount}
                            </p>
                        )}
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