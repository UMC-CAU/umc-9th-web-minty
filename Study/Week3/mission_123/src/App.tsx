import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MoviePage from './pages/MoviePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
