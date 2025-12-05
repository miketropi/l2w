import { CollectionConfig, CollectionSlug } from "payload";

export const Modules: CollectionConfig = {
  slug: 'modules',
  admin: {
    useAsTitle: 'title',
    group: 'Courses System',
    description: 'Create and manage modules',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses' as unknown as CollectionSlug,
      required: true,
    },
    {
      name: 'lessons',
      type: 'relationship',
      relationTo: 'lessons' as unknown as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
