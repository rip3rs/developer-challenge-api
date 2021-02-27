import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CommentService } from '@services/comment.service'
import { PostService } from '@services/post.service'
import { forkJoin, Observable, Subject } from 'rxjs'
import { map, mergeMap, takeUntil } from 'rxjs/operators'
import { Comment, Post } from '~types/post'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<any> = new Subject()
  public posts$: Observable<Post[] | []>

  constructor(private _postService: PostService, private _commentService: CommentService, private _route: Router) {
    this.posts$ = this._postService.posts$.pipe(
      takeUntil(this._destroy$),
      mergeMap((posts) => forkJoin([...posts.map((post) => this._commentService.getPostWithComments$(post, 2))]))
    )
  }

  ngOnInit(): void {}

  public goToPost(slug: string): void {
    this._route.navigate([slug])
  }

  public trackByFn(index: number, item: Post): number {
    return item.id
  }

  ngOnDestroy() {
    this._destroy$.next(null)
    this._destroy$.complete()
    this._destroy$.unsubscribe()
  }
}
