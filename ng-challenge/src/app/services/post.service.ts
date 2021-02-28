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
  constructor(private _http: HttpClient) {}

  public getAll$(data: string): Observable<Post[]> {
    return this._http
      .get<Post[]>(
        `${environment.beBaseUrl}/posts?q=${data}&_sort=publish_date&_order=desc`
      )
      .pipe(take(1))
  }

  public getOne$(slug: string): Observable<Post> {
    return this._http
      .get<Post[]>(`${environment.beBaseUrl}/posts/${slug}&_embed=comments`)
      .pipe(
        take(1),
        map((post) => post[0])
      )
  }
}
