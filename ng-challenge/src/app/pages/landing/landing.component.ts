import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CommentService } from '@services/comment.service'
import { PostService } from '@services/post.service'
import { forkJoin, from, Observable, of, Subject } from 'rxjs'
import {
  debounceTime,
  mergeMap,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators'
import { Comments } from '~types/comment'
import { Post } from '~types/post'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<any> = new Subject()
  public posts$: Observable<Post[] | []>
  private _searchInput: Subject<string> = new Subject<string>()

  constructor(
    private _postService: PostService,
    private _commentService: CommentService,
    private _route: Router
  ) {
    this.posts$ = this._searchInput.pipe(
      startWith(''),
      // distinctUntilChanged(),
      debounceTime(300),
      mergeMap((searchString) =>
        this._postService.getAll$(searchString).pipe(
          mergeMap((posts) => {
            if (posts.length > 0) {
              return forkJoin([
                ...posts.map((post) =>
                  this._commentService.getPostWithComments$(post, 2)
                ),
              ])
            }

            return of([])
          })
        )
      ),
      takeUntil(this._destroy$)
    )
  }

  ngOnInit(): void {}

  public searchText(output: string): void {
    this._searchInput.next(output)
  }

  public goToPost(slug: string): void {
    this._route.navigate([slug])
  }

  public trackByFn(index: number, item: Post): number {
    return item.id
  }

  public addComment(comment: Comments): void {
    this._commentService
      .addComment$(comment)
      .pipe(take(1))
      .subscribe(
        () => {},
        (err) => console.error(err),
        () => this.searchText('')
      )
  }

  ngOnDestroy() {
    this._destroy$.next(null)
    this._destroy$.complete()
    this._destroy$.unsubscribe()
  }
}
