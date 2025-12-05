import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    // Check origin - ensure request is from same base domain
    const requestUrl = new URL(request.url)
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // Get base domain from request URL
    const baseDomain = requestUrl.origin

    // Check if origin or referer matches base domain
    const isValidOrigin = origin === baseDomain || referer?.startsWith(baseDomain)

    if (!isValidOrigin) {
      return new Response(
        JSON.stringify({ error: '__error' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize Payload
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Parse request body
    const { to, subject, message } = await request.json()

    // Send email
    const emailResponse = await payload.sendEmail({
      to: to,
      subject: subject,
      html: message,
    })

    return new Response(JSON.stringify(emailResponse), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}