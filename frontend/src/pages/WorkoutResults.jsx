import { useNavigate } from 'react-router-dom'

function WorkoutResults({ exercise, repCount, onDoMore }) {

    const navigate = useNavigate()

    return (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-6 rounded-xl">
            <p className="text-[#cefcff] text-2xl font-bold tracking-widest uppercase">great work!</p>
            <p className="text-white text-6xl font-bold">{repCount}</p>
            <p className="text-gray-400 text-sm tracking-widest uppercase">{exercise} reps completed</p>
            <div className="flex flex-col gap-3 mt-4">
                <button
                    onClick={onDoMore}
                    className="bg-[#cefcff] hover:opacity-80 text-black text-sm font-bold tracking-widest uppercase px-12 py-3 rounded-lg"
                >
                    do more
                </button>
             <button
                onClick={() => window.location.href = '/'}
                className="bg-white hover:opacity-80 text-black text-sm font-bold tracking-widest uppercase px-12 py-3 rounded-lg"
            >
                try more exercises
            </button>
            </div>
        </div>
    )
}

export default WorkoutResults