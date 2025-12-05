import { CollectionConfig, CollectionSlug } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    group: 'Courses System',
    description: 'Create and manage courses system',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      // richText
      type: 'richText',
      admin: {
        description: 'This is the excerpt of the course',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'course-categories' as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'course-tags' as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'modules',
      type: 'relationship',
      relationTo: 'modules' as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
    },
  ],
}
