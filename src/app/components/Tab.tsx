"use client"

import { useState, ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabProps {
  items: TabItem[]
  defaultActiveId?: string
  activeId?: string
  onTabChange?: (id: string) => void
  className?: string
}

export default function Tab({ 
  items, 
  defaultActiveId, 
  activeId: controlledActiveId,
  onTabChange,
  className = '' 
}: TabProps) {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || ''
  )

  // Use controlled state if provided, otherwise use internal state
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId

  const handleTabClick = (id: string) => {
    if (controlledActiveId === undefined) {
      setInternalActiveId(id)
    }
    onTabChange?.(id)
  }

  const activeTab = items.find(item => item.id === activeId)

  return (
    <div className={className}>
      {/* Tab List */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-1" aria-label="Tabs">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors
                  border-b-2
                  ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-700 hover:text-indigo-600 hover:border-gray-300'
                  }
                `}
                aria-selected={isActive}
                role="tab"
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}

