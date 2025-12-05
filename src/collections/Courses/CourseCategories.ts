import { CollectionConfig } from "payload";

export const CourseCategories: CollectionConfig = {
  slug: 'course-categories',
  admin: {
    useAsTitle: 'name',
    group: 'Courses System',
    description: 'Create and manage course categories',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
  ],
}

