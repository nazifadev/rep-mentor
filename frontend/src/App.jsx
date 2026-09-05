import Camera from './pages/Camera'
import ExerciseSelection from './pages/ExerciseSelection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/camera' element= {<Camera></Camera>}> </Route>
        <Route path = '/' element ={<ExerciseSelection></ExerciseSelection>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
