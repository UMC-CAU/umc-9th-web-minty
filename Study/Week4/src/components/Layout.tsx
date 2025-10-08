import { Outlet, NavLink } from 'react-router-dom'

const navBarStyle = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'px-4 py-2 rounded-lg text-rose-400 font-semibold transition-colors'
    : 'px-4 py-2 rounded-md text-black hover:bg-gray-300 transition-colors'

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <nav>
        <ul className="flex items-center gap-6 container mx-auto px-6 py-4">
          <li>
            <NavLink to="/" className={navBarStyle}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/popular" className={navBarStyle}>
              인기 영화
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/now-playing" className={navBarStyle}>
              상영 중
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/top-rated" className={navBarStyle}>
              평점 높음
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/upcoming" className={navBarStyle}>
              개봉 예정
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
