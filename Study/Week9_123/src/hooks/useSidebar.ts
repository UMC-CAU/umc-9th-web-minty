import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const location = useLocation()

    const open = useCallback(() => {
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    // 페이지 이동 시 사이드바 닫기
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                close()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, close])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return {
        isOpen,
        open,
        close,
        toggle,
        sidebarRef,
    }
}
