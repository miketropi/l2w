import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {currentYear} L2w. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

