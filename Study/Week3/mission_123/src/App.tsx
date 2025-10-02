import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PopularPage from './pages/PopularPage'
import NowPlayingPage from './pages/NowPlayingPage'
import TopRatedPage from './pages/TopRatedPage'
import UpcomingPage from './pages/UpcomingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/popular" element={<PopularPage />} />
          <Route path="/movies/now-playing" element={<NowPlayingPage />} />
          <Route path="/movies/top-rated" element={<TopRatedPage />} />
          <Route path="/movies/upcoming" element={<UpcomingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
