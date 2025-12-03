import React from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'indigo' | 'transparent'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
  align?: 'left' | 'center' | 'right'
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  indigo: 'bg-indigo-50',
  transparent: 'bg-transparent',
}

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function Section({
  children,
  className = '',
  background = 'transparent',
  padding = 'md',
  maxWidth = '7xl',
  align = 'left',
}: SectionProps) {
  const backgroundClass = backgroundClasses[background]
  const paddingClass = paddingClasses[padding]
  const maxWidthClass = maxWidthClasses[maxWidth]
  const alignClass = alignClasses[align]

  return (
    <section className={`${backgroundClass} ${paddingClass}`}>
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 ${alignClass} ${className}`}>
        {children}
      </div>
    </section>
  )
}

