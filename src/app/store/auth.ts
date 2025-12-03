import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { redirect } from 'next/navigation'

import { User } from '@/payload-types'

interface AuthState {
  user: User | null
  token: string | null 
  loading: boolean,
  error: string | null,
  setUser: (user: User | null) => void
  clearError: () => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  me: () => Promise<void>
}

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
} as const

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      ...initialState,
      setUser: (user: User | null) => {
        set(state => { state.user = user })
      },
      clearError: () => {
        set(state => { state.error = null })
      },
      login: async (email: string, password: string) => {
        set(state => { state.loading = true })

        try {
          const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const data = await res.json()

          if (res.ok) {
            set(state => {
              state.user = data.user
              state.token = data.token
              state.loading = false
              state.error = null
            })

            return data.user
          } else {
            // console.log('___data.error', data.errors[0].message)
            set(state => { state.error = data.errors[0].message })
            throw new Error(data.errors[0].message)
          }
        } catch (err) {
          set(state => { state.error = err instanceof Error ? err.message : 'An unknown error occurred' })
          throw err
        } finally {
          set(state => { state.loading = false })
        }
      },
      signup: async (email: string, password: string, firstName: string, lastName: string) => {
        set(state => { state.loading = true })
        set(state => { state.error = null })

        try {
          const res = await fetch('/api/payload/register', {
            method: 'POST',
            body: JSON.stringify({ 
              email, 
              password,
              firstName,
              lastName,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const data = await res.json()

          if (res.ok) {
            // After successful signup, automatically log in
            const loginRes = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: {
                'Content-Type': 'application/json',
              },
            })

            const loginData = await loginRes.json()

            if (loginRes.ok) {
              set(state => {
                state.user = loginData.user
                state.token = loginData.token
                state.loading = false
                state.error = null
              })

              return loginData.user
            } else {
              set(state => { state.error = loginData?.message || 'Account created but login failed' })
              throw new Error(loginData?.message || 'Account created but login failed')
            }
          } else {
            set(state => { state.error = data?.message || 'Signup failed' })
            throw new Error(data?.message || 'Signup failed')
          }
        } catch (err) {
          set(state => { state.error = err instanceof Error ? err.message : 'An unknown error occurred' })
          throw err
        } finally {
          set(state => { state.loading = false })
        }
      },
      logout: async () => {
        set(state => { state.loading = true })
        
        // logout handle 
        try {
          const res = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include', 
          })

          if (res.ok) {
            set(state => {
              state.user = null
              state.token = null
              state.loading = false
            })
          } else {
            set(state => { state.loading = false })
            throw new Error((await res.json()).message)
          }
        } catch (err) {
          set(state => { state.loading = false })
          throw err
        }
      },
      me: async () => {
        set(state => { state.loading = true })

        try {
          const res = await fetch('/api/users/me', {
            credentials: 'include',
          })
          const data = await res.json()

          set(state => { state.user = data.user })
          set(state => { state.loading = false })
          return data.user
        } catch (err) {
          set(state => { state.loading = false })
          throw err
        }
      }
    })),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)
