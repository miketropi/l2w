import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">Learn to Work</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern platform built with Payload CMS and Next.js. Learn, grow, and build amazing things.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://payloadcms.com/docs"
              className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Docs
            </a>
            <a
              href="/admin"
              className="inline-block bg-white text-indigo-600 py-3 px-8 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors font-semibold"
            >
              Go to Admin
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-indigo-600 text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Modern</h3>
            <p className="text-gray-600">
              Built with Next.js 15 and the latest web technologies for optimal performance.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-indigo-600 text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payload CMS</h3>
            <p className="text-gray-600">
              Powerful headless CMS that gives you full control over your content and data.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-indigo-600 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Beautiful UI</h3>
            <p className="text-gray-600">
              Clean, responsive design with Tailwind CSS that works on all devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
