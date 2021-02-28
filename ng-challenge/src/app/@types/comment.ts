export interface Comments {
  id: number
  postId: number
  parent_id: number
  user: string
  date: Date
  content: string
}
