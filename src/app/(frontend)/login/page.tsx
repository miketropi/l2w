"use client"
import { useEffect, useState } from 'react'
import Section from '@/app/components/Section'
import SigninForm from '@/app/components/SigninForm'
import SignupForm from '@/app/components/SignupForm'
import Tab, { TabItem } from '@/app/components/Tab'
import { useAuthStore } from '@/app/store/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login, signup, user, error, clearError } = useAuthStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('signin')
  
  const onLogin = async (email: string, password: string) => {
    await login(email, password)
  }

  const onSignup = async (email: string, password: string, firstName: string, lastName: string) => {
    await signup(email, password, firstName, lastName)
  }

  const handleTabChange = (tabId: string) => {
    clearError()
    setActiveTab(tabId)
  }

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const tabs: TabItem[] = [
    {
      id: 'signin',
      label: 'Login',
      content: <SigninForm onLogin={onLogin} error={error} />
    },
    {
      id: 'signup',
      label: 'Register',
      content: <SignupForm onSignup={onSignup} error={error} />
    }
  ]

  if(user) {
    return (
      <Section maxWidth="md">
        <div className="max-w-md mx-auto py-16 flex flex-col items-center">
          <div className="w-full bg-white rounded-xl p-8 text-center shadow">
            <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 10.75a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM17 17.5a5 5 0 00-10 0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-1">Already Signed In</h2>
            <p className="text-gray-500 mb-6 text-sm">You're already logged in.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section maxWidth="md">
      <Tab 
        items={tabs} 
        activeId={activeTab}
        onTabChange={handleTabChange}
        className="max-w-md mx-auto"
      />
    </Section>
  )
}