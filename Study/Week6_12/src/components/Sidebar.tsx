import { Link, useLocation } from 'react-router'

export default function Sidebar() {
  const location = useLocation()
  const getButtonClassName = (path: string) => {
    const baseClasses =
      'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200'
    const activeClasses = 'bg-gray-800 text-white'
    const inactiveClasses = 'text-gray-400 hover:bg-gray-900 hover:text-white'

    return `${baseClasses} ${
      location.pathname === path ? activeClasses : inactiveClasses
    }`
  }

  return (
    <aside className="w-64 bg-black border-r border-gray-800 min-h-screen p-4 flex flex-col">

      <nav className="flex flex-col gap-2">
        <button className={getButtonClassName('/search')} disabled>
          찾기
        </button>

        <Link to="/mypage" className={getButtonClassName('/mypage')}>
          마이페이지
        </Link>
      </nav>
    </aside>
  )
}
