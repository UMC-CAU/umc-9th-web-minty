import { useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearch } from '../../hooks/useSearch'
import { useDebounce } from '../../hooks/useDebounce'

export const SearchModal = () => {
  const {
    isOpen,
    searchQuery,
    debouncedQuery,
    closeModal,
    setSearchQuery,
    setDebouncedQuery,
  } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(searchQuery, 300)

  useEffect(() => {
    setDebouncedQuery(debouncedValue)
  }, [debouncedValue, setDebouncedQuery])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeModal])

  if (!isOpen) return null

  const handleClearAndClose = () => {
    setSearchQuery('')
    closeModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">

      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto">

        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-800">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="LP 검색..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
            aria-label="LP 검색"
          />
          <button
            onClick={handleClearAndClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="검색 취소"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>


        <div className="px-4 py-3 text-sm text-gray-400">
          {debouncedQuery.trim() ? (
            <p>
              검색 중: <span className="text-white">{debouncedQuery}</span>
            </p>
          ) : (
            <p>LP를 검색하려면 검색어를 입력하세요</p>
          )}
        </div>
      </div>
    </div>
  )
}
