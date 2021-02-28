import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { Comments } from '~types/comment'
import { Post } from '~types/post'

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

    return this._http.get<Comments[]>(url).pipe(
      take(1),
      map((comments) => ({
        ...post,
        comments: comments.sort((a: Comments, b: Comments) => a.id - b.id),
      }))
    )
  }

  public addComment$(data: Comments): Observable<Comments> {
    return this._http
      .post<Comments>(`${environment.beBaseUrl}/comments`, data)
      .pipe(take(1))
  }
}
