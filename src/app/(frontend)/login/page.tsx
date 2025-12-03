"use client"

import Section from '@/app/components/Section'
import LoginForm from '@/app/components/LoginForm'
import { useAuthStore } from '@/app/store/auth'

export default function LoginPage() {
  const { login } = useAuthStore()
   
  const onLogin = async (email: string, password: string) => {
    await login(email, password)
  }

  return (
    <Section>
      <LoginForm onLogin={onLogin} />
    </Section>
  )
}