import { useNavigate } from 'react-router-dom' //to change pages when button is clicked

function ExerciseSelection() {


  const navigate = useNavigate()

  const handleExerciseSelect = (exercise) => {
    navigate('/camera', { state: { exercise } }) //func called when butons are pressed
  }


  return (
    <div className="min-h-screen bg-black flex flex-col">

{/* <nav className="w-full px-6 sm:px-10 py-5 flex items-center justify-center sm:justify-between border-b border-gray-800">
  <span className="text-white font-bold text-sm sm:text-lg tracking-widest uppercase">rep-mentor</span>
  <span className="text-gray-500 text-xs tracking-widest uppercase hidden sm:block">real-time form coach</span>
</nav> */}

      <div className="flex-1 flex flex-col items-center justify-start sm:justify-center pt-10 md:pt-10 px-4 sm:px-6 md:px-10 gap-6 sm:gap-8 md:gap-10 pb-12 sm:pb-0">

        <h1 className="font-bold text-white drop-shadow-[0_0_40px_white] text-center leading-none w-full text-7xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl">
          welcome, let's move.
        </h1>

        <div className="flex flex-col mt-2 items-center gap-4 md:gap-6 w-full max-w-3xl">
          <p className="text-gray-400 text-base sm:text-xl md:text-2xl lg:text-xl xl:text-xl 2xl:text-1xl font-semibold tracking-widest uppercase text-center mt-4 sm:mt-7">
            choose your exercise
          </p>
          <div className="grid mt-3 grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7 w-full">
            <button onClick={() => handleExerciseSelect('squat')} className="border border-gray-800 rounded-2xl py-7 sm:py-14 md:py-20 lg:py-12 xl:py-14 2xl:py-20 px-4 flex flex-col items-center gap-2 md:gap-3 text-white hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] hover:-translate-y-3 transition-all duration-200">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold">squat</span>
              <span className="text-xs sm:text-sm text-gray-600 tracking-widest uppercase">lower body</span>
            </button>
            <button onClick={() => handleExerciseSelect('push-up')} className="border border-gray-800 rounded-2xl py-7 sm:py-14 md:py-20 lg:py-12 xl:py-14 2xl:py-20 px-4 flex flex-col items-center gap-2 md:gap-3 text-white hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] hover:-translate-y-3 transition-all duration-200">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold">push-up</span>
              <span className="text-xs sm:text-sm text-gray-600 tracking-widest uppercase">upper body</span>
            </button>
            <button  onClick={() => handleExerciseSelect('bicep curl')}className="border border-gray-800 rounded-2xl py-7 sm:py-14 md:py-20 lg:py-12 xl:py-14 2xl:py-20 px-4 flex flex-col items-center gap-2 md:gap-3 text-white hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] hover:-translate-y-3 transition-all duration-200">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold">bicep curl</span>
              <span className="text-xs sm:text-sm text-gray-600 tracking-widest uppercase">arms</span>
            </button>
            <button onClick={() => handleExerciseSelect('shoulder press')} className="border border-gray-800 rounded-2xl py-7 sm:py-14 md:py-20 lg:py-12 xl:py-14 2xl:py-20 px-4 flex flex-col items-center gap-2 md:gap-3 text-white hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] hover:-translate-y-3 transition-all duration-200">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold">shoulder press</span>
              <span className="text-xs sm:text-sm text-gray-600 tracking-widest uppercase">shoulders</span>
            </button>
          </div>
        </div>
      </div>



    </div>
  )
}

export default ExerciseSelection