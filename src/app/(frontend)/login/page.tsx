"use client"
import { useEffect } from 'react'
import Section from '@/app/components/Section'
import LoginForm from '@/app/components/LoginForm'
import { useAuthStore } from '@/app/store/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login, user, error } = useAuthStore()
  const router = useRouter()
   
  const onLogin = async (email: string, password: string) => {
    await login(email, password)
  }

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <Section>
      <LoginForm onLogin={onLogin} error={error} />
    </Section>
  )
}