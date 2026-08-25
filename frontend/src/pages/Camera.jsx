import { useEffect } from "react"
import { useRef } from "react"

function Camera(){
    //logic before return statement
    const videoRef = useRef()  //ref (connection) to the video tag

    useEffect(()=> { // block of code that useEffect will run after page load
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true }) //asking for webcam feed
            videoRef.current.srcObject = stream
            videoRef.current.play()
        } catch (err) {
            console.error("Camera access error", err)
        }
    }

    startCamera()

    return () => {
        //runs when user leaves the page and turns camera off
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop())
        }
    }
}, [])














return (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <video ref={videoRef} className="w-full max-w-2xl rounded-xl shadow-2xl"/>
    </div>
)
}
export default Camera