"use client"

import { useState, useRef, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface PopoverProps {
  trigger: ReactNode
  content: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: PopoverPosition
  align?: 'start' | 'center' | 'end'
  className?: string
  contentClassName?: string
  closeOnClickOutside?: boolean
  closeOnContentClick?: boolean
}

export default function Popover({
  trigger,
  content,
  open: controlledOpen,
  onOpenChange,
  position = 'bottom',
  align = 'center',
  className = '',
  contentClassName = '',
  closeOnClickOutside = true,
  closeOnContentClick = false,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top - contentRect.height - 8
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
        break
      case 'bottom':
        top = triggerRect.bottom + 8
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
        break
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
        left = triggerRect.left - contentRect.width - 8
        break
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
        left = triggerRect.right + 8
        break
      case 'top-left':
        top = triggerRect.top - contentRect.height - 8
        left = triggerRect.left
        break
      case 'top-right':
        top = triggerRect.top - contentRect.height - 8
        left = triggerRect.right - contentRect.width
        break
      case 'bottom-left':
        top = triggerRect.bottom + 8
        left = triggerRect.left
        break
      case 'bottom-right':
        top = triggerRect.bottom + 8
        left = triggerRect.right - contentRect.width
        break
    }

    // Adjust if popover would go off screen
    if (left < 8) left = 8
    if (left + contentRect.width > viewportWidth - 8) {
      left = viewportWidth - contentRect.width - 8
    }
    if (top < 8) top = 8
    if (top + contentRect.height > viewportHeight - 8) {
      top = viewportHeight - contentRect.height - 8
    }

    setPopoverPosition({ top, left })
  }

  useEffect(() => {
    if (isOpen) {
      updatePosition()
      const handleResize = () => updatePosition()
      const handleScroll = () => updatePosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen, position])

  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current?.contains(event.target as Node) ||
        contentRef.current?.contains(event.target as Node)
      ) {
        return
      }
      handleOpenChange(false)
    }

    // Use setTimeout to avoid immediate close when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closeOnClickOutside])

  const handleContentClick = () => {
    if (closeOnContentClick) {
      handleOpenChange(false)
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onClick={() => handleOpenChange(!isOpen)}
      >
        {trigger}
      </div>

      {isOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={contentRef}
            className={`fixed z-50 ${contentClassName}`}
            style={{
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
            }}
            onClick={handleContentClick}
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] overflow-hidden">
              {content}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

// Helper component for menu items
interface PopoverMenuItemProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function PopoverMenuItem({ 
  children, 
  onClick, 
  className = '',
  disabled = false 
}: PopoverMenuItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-4 py-2 text-left text-sm font-medium text-gray-700
        hover:bg-gray-50 hover:text-indigo-600
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Helper component for menu separator
export function PopoverMenuSeparator() {
  return <div className="border-t border-gray-200 my-1" />
}

