import { Comments } from './comment'

export interface Post {
  id: number
  title: string
  author: string
  publish_date: Date
  slug: string
  description: string
  content: string
  comments?: Comments[]
}
