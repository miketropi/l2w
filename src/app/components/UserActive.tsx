"use client"
import Link from 'next/link'
import Popover, { PopoverMenuItem, PopoverMenuSeparator } from '@/app/components/Popover'
import { useAuthStore } from '@/app/store/auth'
import { useRouter } from 'next/navigation'

export default function UserActive() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!user) {
    return (
      <Link 
        href="/login"
        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Login
      </Link>
    )
  }

  const trigger = (
    <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer" title={ user.email || 'User' }>
      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-indigo-600 text-xs font-medium">
          {user.email?.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>
      <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[120px] truncate">
        {user.email}
      </span>
    </button>
  )

  const popoverContent = (
    <>
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
        {user.firstName && user.lastName && (
          <p className="text-xs text-gray-500 mt-1">
            {user.firstName} {user.lastName}
          </p>
        )}
      </div>
      <PopoverMenuItem onClick={() => router.push('/dashboard/myaccount')}>
        My Account
      </PopoverMenuItem>
      <PopoverMenuSeparator />
      <PopoverMenuItem onClick={handleLogout}>
        Logout
      </PopoverMenuItem>
    </>
  )

  return (
    <Popover 
      trigger={trigger}
      content={popoverContent}
      position="bottom-right"
      closeOnContentClick={true}
    />
  )
}