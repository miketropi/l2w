import React from 'react'
import Link from 'next/link'
import Section from '@/app/components/Section'

export default function HomePage() {
  return (
    <Section background="white" padding="xl" maxWidth="2xl" align="center">
      <h1 className="text-4xl md:text-5xl font-semibold mb-4">
        Learn to Work
      </h1>
      <p className="text-md mb-8 font-mono">
        A modern platform built with Payload CMS and Next.js.
      </p>
      <Link
        href="/login"
        className="inline-block px-6 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        Get Started →
      </Link>
    </Section>
  )
}
