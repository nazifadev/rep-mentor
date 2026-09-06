import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'

function History() {

    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSessions = async () => {
            if (!auth.currentUser) {
                navigate('/')
                return
            }
            const q = query(
                collection(db, "workoutSessions"),
                where("userId", "==", auth.currentUser.uid),
                orderBy("date", "desc")
            )
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setSessions(data)
            setLoading(false)
        }
        fetchSessions()
    }, [])

    return (
        <div className="min-h-screen bg-black flex flex-col items-center gap-8  md:px-15">

         <nav className="w-full px-6 py-4 md:py-7 flex items-center gap-3 md:gap-3 border-b border-gray-600">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
                <rect x="2" y="10" width="5" height="12" rx="2" fill="#cefcff"/>
                <rect x="5" y="8" width="3" height="16" rx="1.5" fill="#cefcff"/>
                <rect x="8" y="14" width="16" height="4" rx="1.5" fill="#cefcff"/>
                <rect x="24" y="10" width="5" height="12" rx="2" fill="#cefcff"/>
                <rect x="24" y="8" width="3" height="16" rx="1.5" fill="#cefcff"/>
            </svg>
            <span className="text-white font-semibold text-sm md:text-lg">rep mentor</span>
            <div className="ml-auto">
                <div className="flex items-center gap-2">
                    <img src={auth.currentUser?.photoURL} className="w-8 h-8 rounded-full" />
                    <span className="text-white text-sm hidden md:block">{auth.currentUser?.displayName}</span>
                    <button onClick={() => navigate('/')} className="ml-5 text-black bg-[#cefcff] hover:opacity-80 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-lg">
                        back
                    </button>
                </div>
            </div>
        </nav>

            {/* centered title */}
            <h1 className="text-[#cefcff] text-5xl md:text-7xl font-bold text-center leading-none px-6 fraunces-hero">
                workout history
            </h1>

            {/* content */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-[#cefcff] border-t-transparent animate-spin" />
                </div>
            ) : sessions.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-sm tracking-widest uppercase">no workouts yet</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full max-w-3xl px-6 pb-10">
                    {sessions.map(session => (
                        <div key={session.id} className="bg-white/10 rounded-2xl p-5 flex justify-between items-center">
                            <div>
                                <p className="text-white font-bold text-lg capitalize">{session.exercise}</p>
                                <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">
                                    {session.date?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <p className="text-[#cefcff] text-3xl font-bold">{session.reps} <span className="text-gray-400 text-xs tracking-widest uppercase">reps</span></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default History