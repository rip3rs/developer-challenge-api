import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import { Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { Comment, Post } from '~types/post'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _http: HttpClient) {}

  public getPostWithComments$(post: Post, limit?: number): Observable<Post> {
    let url = `${environment.beBaseUrl}/comments?postId=${post.id}&_sort=id&_order=desc`

    if (limit) {
      url += `&_limit=${limit}`
    }

    return this._http.get<Comment[]>(url).pipe(
      take(1),
      map((comments) => ({
        ...post,
        comments: comments.sort((a: Comment, b: Comment) => a.id - b.id),
      }))
    )
  }

  public addComment$(data: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${environment.beBaseUrl}/comments`, data).pipe(take(1))
  }
}
