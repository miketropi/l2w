"use client"

import { useAuthStore } from '@/app/store/auth'

export default function DashboardPage() {
  const { logout } = useAuthStore()

  return (
    <div>
      <h1>Dashboard</h1>
      {
        // make logout
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => logout()}>Logout</button>
      }
    </div>
  )
}