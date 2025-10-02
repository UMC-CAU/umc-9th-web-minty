interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  //표시할 페이지 계산
  const maxPagesToShow = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  const buttonStyle = (isActive: boolean) =>
    isActive
      ? 'px-4 py-2 rounded-lg text-rose-400 font-semibold transition-all'
      : 'px-4 py-2 rounded-md hover:bg-gray-300 transition-all'

  const navButtonStyle = 'px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all'

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navButtonStyle}
      >
        이전
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={buttonStyle(false)}>
            1
          </button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} className={buttonStyle(page === currentPage)}>
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <button onClick={() => onPageChange(totalPages)} className={buttonStyle(false)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navButtonStyle}
      >
        다음
      </button>
    </div>
  )
}

export default Pagination
