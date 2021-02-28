import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { Post } from '~types/post'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // private _posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([])
  private _post$: ReplaySubject<Post> = new ReplaySubject<Post>(1)

  constructor(private _http: HttpClient) {}

  public getAll$(data: string): Observable<Post[]> {
    return this._http
      .get<Post[]>(
        `${environment.beBaseUrl}/posts?q=${data}&_sort=publish_date&_order=desc`
      )
      .pipe(take(1))
  }

  // public get posts$(): Observable<Post[]> {
  //   return this._posts$
  // }

  public get post$(): Observable<Post> {
    return this._post$
  }

  public getOne$(slug: string): Observable<Post> {
    return this._http
      .get<Post[]>(`${environment.beBaseUrl}/posts/${slug}&_embed=comments`)
      .pipe(
        take(1),
        map((post) => {
          if (post.length > 0) {
            this._post$.next(post[0])
          }

          return post[0]
        })
      )
  }
}
