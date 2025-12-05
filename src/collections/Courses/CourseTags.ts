import { CollectionConfig } from "payload";

export const CourseTags: CollectionConfig = {
  slug: 'course-tags',
  admin: {
    useAsTitle: 'name',
    group: 'Courses System',
    description: 'Create and manage course tags',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
  ],
}
