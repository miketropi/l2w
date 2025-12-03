import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import AuthInitializer from '@/app/components/AuthInitializer'
import './styles.css'

export const metadata = {
  description: 'Learn to Work with Payload CMS',
  title: 'Learn to Work',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-display">
        <AuthInitializer />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
