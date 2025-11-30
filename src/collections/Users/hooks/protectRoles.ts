import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

// Cleaner + safer version
export const protectRoles: FieldHook<User> = ({ req, data }) => {
  const currentUser = req.user
  const isAdmin = currentUser?.roles?.includes('admin')

  // Always enforce 'user' role
  const incomingRoles = new Set(data?.roles || [])
  incomingRoles.add('user')

  // If admin → allow any modification
  if (isAdmin) {
    return [...incomingRoles]
  }

  // If NOT admin → reject all modifications to roles
  // --------------------------------------------------

  const originalRoles = new Set(req.data?.roles || [])

  // Preserve 'editor' if user originally had it
  if (originalRoles.has('editor')) {
    incomingRoles.add('editor')
  }

  // Non-admin cannot add any new role except 'user'
  return [...incomingRoles].filter(role => {
    // Allowed for non-admin: user, (editor only if originally had)
    if (role === 'user') return true
    if (role === 'editor' && originalRoles.has('editor')) return true
    return false
  })
}
