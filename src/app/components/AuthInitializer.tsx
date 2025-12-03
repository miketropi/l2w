"use client";

import { useEffect } from 'react'
import { useAuthStore } from '@/app/store/auth'

export default function AuthInitializer() {
  const { me } = useAuthStore()

  useEffect(() => {
    const fetchUser = async () => {
      await me()
    }
    fetchUser()
  }, [me])

  return null
}