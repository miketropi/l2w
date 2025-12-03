import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await req.json()

  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        roles: ['user'],
      },
    })

    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: (error as Error).message }),
      { status: 400 }
    )
  }
}
