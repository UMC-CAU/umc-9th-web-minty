import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // 앞으로가기/뒤로가기 버튼 처리
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }

  return (
    <>
      <div>
        <button onClick={() => navigateTo('/page1')}>Page 1</button>
        <button onClick={() => navigateTo('/page2')}>Page 2</button>
      </div>

      {/*수동으로 URL매칭...*/}
      {currentPath === '/page1' && <h1>Page 1</h1>}
      {currentPath === '/page2' && <h1>Page 2</h1>}
      {currentPath !== '/page1' && currentPath !== '/page2' && <h1>Home</h1>}

      <div className="card">
        <p>
          History API를 사용한 Single Page Application
        </p>
      </div>
    </>
  )
}

export default App
