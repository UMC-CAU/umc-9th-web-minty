/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export interface SearchContextType {
  isOpen: boolean
  searchQuery: string
  debouncedQuery: string
  openModal: () => void
  closeModal: () => void
  setSearchQuery: (query: string) => void
  setDebouncedQuery: (query: string) => void
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const location = useLocation()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  // 페이지 이동 시 모달 닫기
  useEffect(() => {
    if (isOpen) {
      closeModal()
    }
  }, [location.pathname])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        searchQuery,
        debouncedQuery,
        openModal,
        closeModal,
        setSearchQuery,
        setDebouncedQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
