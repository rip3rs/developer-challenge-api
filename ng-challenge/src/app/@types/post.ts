export interface Post {
  id: number
  title: string
  author: string
  publish_date: Date
  slug: string
  description: string
  content: string
  comments?: Comment[]
}

export interface Comment {
  id: number
  postId: number
  parent_id: number
  user: string
  date: Date
  content: string
}
