import { CollectionConfig } from 'payload'
import { Courses } from './Courses'
import { Modules } from './Modules'
import { Lessons } from './Lessons'
import { CourseCategories } from './CourseCategories'
import { CourseTags } from './CourseTags'

export const CoursesCollections: CollectionConfig[] = [Courses, Modules, Lessons, CourseCategories, CourseTags]