import { useNavigate } from 'react-router-dom'

function ExerciseSelection() {

  const navigate = useNavigate()

  const handleExerciseSelect = (exercise) => {
    navigate('/camera', { state: { exercise } })
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:px-15 ">

      {/* navbar */}
    <nav className="w-full px-6 py-4 md:py-7 flex items-center gap-3 md:gap-3 border-b border-gray-600 ">
     <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
      <rect x="2" y="10" width="5" height="12" rx="2" fill="#cefcff"/>
      <rect x="5" y="8" width="3" height="16" rx="1.5" fill="#cefcff"/>
      <rect x="8" y="14" width="16" height="4" rx="1.5" fill="#cefcff"/>
      <rect x="24" y="10" width="5" height="12" rx="2" fill="#cefcff"/>
      <rect x="24" y="8" width="3" height="16" rx="1.5" fill="#cefcff"/>
    </svg>
      <span className="text-white font-semibold text-sm md:text-lg">rep mentor</span>
    </nav>

      <div className="flex-1 flex flex-col px-4 md:px-10 pt-8 md:pt-9 md:gap-6 gap-3 px-5">

        {/* hero */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-4 md:gap-8 w-full">
          <h1 className=" fraunces-hero text-[#cefcff]  md:pt-0 leading-none text-center md:text-left text-6xl sm:text-6xl md:text-7xl xl:text-[130px] 2xl:text-[180px]">
            welcome,<br />let's move.
          </h1>
          <div className="hidden md:block w-px h-26 2xl:h-44 bg-gray-700 shrink-0" />
          <p className="text-gray-400 text-sm md:text-base pt-1 md:pt-0 2xl:text-2xl text-center md:text-left max-w-[560px] 2xl:max-w-[450px]">
            Choose one of four movements. We'll watch your form and coach each rep.
            For the best experience, find a clear open space with minimal furniture in the background.
            Make sure the area is well lit and your full body is visible to the camera. Move at a controlled, steady pace as rapid movements may affect tracking accuracy.
          </p>
          <div className="w-full border-b border-gray-800 md:hidden" />

        </div>

        <p className="text-gray-400 text-xs  2xl:text-sm tracking-widest uppercase pt-5 md:pt-8 text-center md:text-left ">
          choose your exercise
        </p>

  {/* exercise buttons */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 pt-2 md:pt-0 md:gap-4 w-full 2xl:pb-0">        
  <button 
    onClick={() => handleExerciseSelect('squat')} 
    className="bg-white hover:bg-[#cefcff] rounded-2xl p-4 md:p-6 flex flex-col justify-end items-start min-h-[100px] sm:min-h-[160px] md:min-h-[260px] 2xl:min-h-[300px] text-left hover:-translate-y-2 transition-all duration-200"
  >
    <svg fill="#000000" className="w-14 h-14 md:w-16 md:h-14 mb-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256.00 256.00" xmlSpace="preserve" stroke="#000000" strokeWidth="0.00256">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.072"></g>
      <g id="SVGRepo_iconCarrier"> 
        <g> 
          <circle cx="127" cy="28.4" r="26.6"></circle> 
          <path d="M213.4,171.2h-49.8V97.3c0-1.8,1.5-3.3,3.3-3.3c0.6,0,1.2,0.2,1.7,0.5l30.1,17.3l-20.8,36c-3.2,5.6-1.3,12.7,4.3,15.9 c5.6,3.2,12.7,1.3,15.9-4.3l26.6-46c3.2-5.6,1.3-12.7-4.3-15.9l-51.6-29.8c-4.7-3.3-10-5.4-15.5-6L127,61.6h0h0l-26.3,0.1 c-5.5,0.6-10.8,2.7-15.5,6L33.6,97.5c-5.6,3.2-7.5,10.3-4.3,15.9l26.6,46c3.2,5.6,10.3,7.5,15.9,4.3c5.6-3.2,7.5-10.3,4.3-15.9 l-20.8-36l30.1-17.3c0.5-0.3,1.1-0.5,1.7-0.5c1.8,0,3.3,1.5,3.3,3.3v24.1v49.8H40.6c-9.2,0-16.6,7.4-16.6,16.6 c0,4.6,1.8,8.7,4.8,11.7l49.7,49.7c6.5,6.5,17,6.5,23.5,0c6.5-6.5,6.5-17,0-23.5l-21.3-21.3l46.2,0l0-13.3c0,0,0,0,0,0s0,0,0,0 l0,13.3l46.2,0l-21.3,21.3c-6.5,6.5-6.5,17,0,23.5c6.5,6.5,17,6.5,23.5,0l49.7-49.7c3-3,4.8-7.1,4.8-11.7 C230,178.7,222.6,171.2,213.4,171.2z"></path> 
        </g> 
      </g>
    </svg>           
    <div className="flex flex-col">
      <span className="text-black text-base md:text-2xl font-bold">squat</span>
      <span className="text-gray-500 text-xs tracking-widest uppercase mt-1">lower body</span>
    </div>
  </button>

  <button 
    onClick={() => handleExerciseSelect('push-up')} 
    className="bg-white hover:bg-[#cefcff] rounded-2xl p-4 md:p-6 flex flex-col justify-end items-start min-h-[100px] sm:min-h-[160px] md:min-h-[260px] 2xl:min-h-[300px] text-left hover:-translate-y-2 transition-all duration-200"
  >
    <svg fill="#000000" className="w-14 h-14 md:w-16 md:h-16 mb-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 94.5 94.5" xmlSpace="preserve">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <g> 
          <path d="M7.276,64.894c0.783,1.856,2.596,3.055,4.619,3.055c0.666,0,1.316-0.131,1.932-0.391L41.164,56.03 c0.321-0.135,0.62-0.301,0.896-0.492c0.247-0.037,0.491-0.093,0.725-0.191l23.384-9.861l8.864,21.018 c0.469,1.114,1.557,1.834,2.77,1.834c0.4,0,0.791-0.079,1.16-0.235l2.072-0.874c0.737-0.31,1.309-0.891,1.611-1.635 c0.303-0.744,0.298-1.559-0.012-2.295L72.141,38.417l-0.001-0.001l-2.017-4.783c-0.469-1.114-1.557-1.834-2.77-1.834 c-0.4,0-0.791,0.079-1.16,0.235L37.972,43.934c-1.21,0.511-1.898,1.728-1.814,2.971L9.804,58.019 c-1.227,0.517-2.18,1.484-2.685,2.725s-0.497,2.599,0.02,3.825L7.276,64.894z"></path> 
          <path d="M83.695,41.547c1.358,0,2.686-0.27,3.947-0.801c2.503-1.056,4.445-3.022,5.468-5.539c1.023-2.516,1.006-5.28-0.05-7.783 c-1.594-3.778-5.273-6.219-9.375-6.219c-1.358,0-2.686,0.269-3.947,0.801c-5.167,2.179-7.597,8.155-5.418,13.322 C75.914,39.106,79.594,41.547,83.695,41.547z"></path> 
          <path d="M92.5,69.295H2c-1.104,0-2,0.896-2,2s0.896,2,2,2h90.5c1.104,0,2-0.896,2-2S93.604,69.295,92.5,69.295z"></path> 
        </g> 
      </g>
    </svg>
    <div className="flex flex-col">
      <span className="text-black text-base md:text-2xl font-bold">push-up</span>
      <span className="text-gray-500 text-xs tracking-widest uppercase mt-1">upper body</span>
    </div>
  </button>

  <button 
    onClick={() => handleExerciseSelect('sit-up')} 
    className="bg-white hover:bg-[#cefcff] rounded-2xl p-4 md:p-6 flex flex-col justify-end items-start min-h-[100px] sm:min-h-[160px] md:min-h-[260px] 2xl:min-h-[300px] text-left hover:-translate-y-2 transition-all duration-200"
  >
    <svg fill="#000000" className="w-14 h-14 md:w-16 md:h-16 mb-3" viewBox="180 50 230 140" xmlns="http://www.w3.org/2000/svg">
      <circle cx="380" cy="65" r="20" fill="black"/>
      <line x1="375" y1="96" x2="355" y2="155" stroke="black" strokeWidth="22" strokeLinecap="round"/>
      <line x1="368" y1="115" x2="310" y2="145" stroke="black" strokeWidth="18" strokeLinecap="round"/>
      <line x1="355" y1="155" x2="230" y2="155" stroke="black" strokeWidth="18" strokeLinecap="round"/>
      <line x1="200" y1="173" x2="390" y2="173" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    </svg>
    <div className="flex flex-col">
      <span className="text-black text-base md:text-2xl font-bold">sit-up</span>
      <span className="text-gray-500 text-xs tracking-widest uppercase mt-1">core</span>
    </div>
  </button>

  <button 
    onClick={() => handleExerciseSelect('lunge')} 
    className="bg-white hover:bg-[#cefcff] rounded-2xl p-4 md:p-6 flex flex-col justify-end items-start min-h-[100px] sm:min-h-[160px] md:min-h-[260px] 2xl:min-h-[300px] text-left hover:-translate-y-2 transition-all duration-200"
  >
    <svg fill="#000000" className="w-14 h-14 md:w-16 md:h-16 mb-3" viewBox="220 10 200 220" xmlns="http://www.w3.org/2000/svg">      <circle cx="325" cy="45" r="20" fill="black"/>
      <line x1="325" y1="80" x2="325" y2="138" stroke="black" strokeWidth="20" strokeLinecap="round"/>
      <line x1="325" y1="102" x2="352" y2="114" stroke="black" strokeWidth="16" strokeLinecap="round"/>
      <line x1="352" y1="114" x2="346" y2="132" stroke="black" strokeWidth="16" strokeLinecap="round"/>
      <line x1="325" y1="138" x2="378" y2="138" stroke="black" strokeWidth="20" strokeLinecap="round"/>
      <line x1="378" y1="138" x2="378" y2="198" stroke="black" strokeWidth="20" strokeLinecap="round"/>
      <line x1="325" y1="138" x2="325" y2="185" stroke="black" strokeWidth="20" strokeLinecap="round"/>
      <line x1="325" y1="185" x2="272" y2="198" stroke="black" strokeWidth="20" strokeLinecap="round"/>
    </svg>
    <div className="flex flex-col">
      <span className="text-black text-base md:text-2xl font-bold">lunge</span>
      <span className="text-gray-500 text-xs tracking-widest uppercase mt-1">lower body</span>
    </div>
  </button>
</div>

      </div>
    </div>
  )
}

export default ExerciseSelection