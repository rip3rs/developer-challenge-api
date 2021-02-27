import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { PostService } from '@services/post.service'
import { Post } from '~types/post'

@Injectable({
  providedIn: 'root',
})
export class LandingResolver implements Resolve<Post[]> {
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _postService: PostService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this._postService.getAll$()
  }
}
