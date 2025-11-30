import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      required: true,
      saveToJWT: true,
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      hooks: {
        beforeChange: [protectRoles],
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: false,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'profilePicture',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
