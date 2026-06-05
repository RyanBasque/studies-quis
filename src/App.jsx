import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}
