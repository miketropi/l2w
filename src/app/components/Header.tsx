import React from 'react'
import Link from 'next/link'

type NavItem = {
  label: string
  href: string
}

const LandingNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Register',
    href: '/register',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
]

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              L2w
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {LandingNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-black hover:text-indigo-600 transition-colors text-md">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

