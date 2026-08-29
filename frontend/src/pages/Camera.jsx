import { useEffect } from "react"
import { useRef } from "react"
import { useLocation } from 'react-router-dom'

function Camera(){
    //logic before return statement
    const videoRef = useRef()  //ref (connection) to the video tag

    const location = useLocation()
    const exercise = location.state?.exercise // grabbing the exercise name that was selected

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
        </div>
     <video 
        ref={videoRef} 
        className="w-full pt-1 max-w-6xl rounded-xl h-[600px] md:h-[700px] object-cover"
    />
    </div>
)

}
export default Camera