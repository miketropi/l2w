import { CollectionConfig, CollectionSlug } from "payload";

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    group: 'Courses System',
    description: 'Create and manage lessons',
  },
  fields: [
    { name: 'title', type: 'text', required: true },

    {
      name: 'type',
      type: 'select',
      options: ['video', 'article', 'quiz'],
      defaultValue: 'video',
    },

    {
      name: 'video',
      type: 'text',
      admin: {
        // in video & article, this field is required
        condition: (_, siblings) => siblings.type === 'video' || siblings.type === 'article',
      },
    },

    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (_, siblings) => siblings.type === 'article' || siblings.type === 'video',
      },
    },

    // Quiz fields tùy thuộc vào logic của bạn
    {
      name: 'quiz',
      type: 'array',
      admin: { condition: (_, s) => s.type === 'quiz' },
      fields: [
        { name: 'question', type: 'text' },
        {
          name: 'options',
          type: 'array',
          fields: [{ name: 'option', type: 'text' }],
        },
        {
          name: 'correct',
          type: 'number',
        },
      ],
    },

    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules' as CollectionSlug,
    },

    {
      name: 'order',
      type: 'number',
    },
  ],
}
