import { useEffect } from "react"
import { useRef } from "react"
import { useLocation } from 'react-router-dom'
import { useState } from "react"

function Camera(){
    const videoRef = useRef()
    const canvasRef = useRef()

    const location = useLocation()
    const exercise = location.state?.exercise

    const [feedbackText, setFeedbackText] = useState("")
    const feedbackRef = useRef("")
    


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
                        
                    //grabbing the 3 points that form a line through the knee joint so we can calculate left + right knee angle
                        const landmarks = results.landmarks[0]
                        const leftHip = landmarks[23]
                        const leftKnee = landmarks[25]
                        const leftAnkle = landmarks[27]
                        const rightHip = landmarks[24]
                        const rightKnee = landmarks[26]
                        const rightAnkle = landmarks[28]

                        const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle)
                        const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle)

                        console.log("Left knee:", leftKneeAngle)
                        console.log("Right knee:", rightKneeAngle)

                       let feedback = ""

                        if (leftKneeAngle > 140 && rightKneeAngle > 140) {
                            feedback = "squat deeper"
                        } else if (leftKneeAngle <= 140 && leftKneeAngle > 100 && rightKneeAngle <= 140 && rightKneeAngle > 100) {
                            feedback = "getting there, keep going"
                        } else if (leftKneeAngle <= 100 && leftKneeAngle >= 80 && rightKneeAngle <= 100 && rightKneeAngle >= 80) {
                            feedback = "perfect depth"
                        } else if (leftKneeAngle < 80 && rightKneeAngle < 80) {
                            feedback = "great depth, come back up"
                        }

                        //checks if new feedback is different than what it was so the feedback does not flicker
                        if (feedback !== feedbackRef.current) {
                        feedbackRef.current = feedback
                        setFeedbackText(feedback)
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
    }, [])

    //takes 3 body landmark points and returns the angle between them in degrees
    const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * (180 / Math.PI))
    if (angle > 180) angle = 360 - angle
    return angle
}

    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-start pt-6 md:pt-10 gap-4 md:gap-6">
            <div className="flex flex-col items-center gap-2 px-4">
                <h1 className="text-3xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_white] text-center">
                    rep-mentor
                </h1>
                <p className="text-gray-400 text-sm md:text-md tracking-widest uppercase text-center">
                    your real-time form coach
                </p>
                <p className="text-white pt-5 text-sm md:text-[15px] tracking-widest uppercase text-center">
                    {exercise}
                </p>

                <p className="text-white text-2xl font-bold tracking-widest uppercase text-center mt-2">
                    {feedbackText}
                </p>
            </div>
            <div className="relative w-full max-w-6xl">
                <video 
                    ref={videoRef} 
                    className="w-full pt-1 rounded-xl h-[600px] md:h-[700px] object-cover"
                />
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                />
            </div>
        </div>
    )
}

export default Camera