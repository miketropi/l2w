"use client"
import Link from 'next/link'
import { useAuthStore } from '@/app/store/auth'

export default function UserActive() {
  const { user, logout } = useAuthStore()

  return (
    <div>
      {
        user ? (
          <>
            <h1>{user?.email}</h1>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )
      }
    </div>
  )
}