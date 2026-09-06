import Camera from './pages/Camera'
import ExerciseSelection from './pages/ExerciseSelection'
import History from './pages/History'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExerciseSelection />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
