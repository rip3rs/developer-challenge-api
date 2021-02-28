import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommentService } from '@services/comment.service'
import { PostService } from '@services/post.service'
import { Observable, Subject } from 'rxjs'
import { map, mergeMap, startWith, take, takeUntil } from 'rxjs/operators'
import { Comments } from '~types/comment'
import { Post } from '~types/post'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private _destroy$: Subject<any> = new Subject()
  private _updatePost: Subject<boolean> = new Subject<boolean>()
  private _limitComments = 5
  public showingAllComments = false
  public post$: Observable<Post>

  constructor(
    private _postService: PostService,
    private _commentService: CommentService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.post$ = this._updatePost.pipe(
      startWith(true),
      takeUntil(this._destroy$),
      mergeMap(() =>
        this._postService.getOne$(this._activatedRoute.snapshot.params.post)
      ),
      map((post) => {
        if (post.comments && !this.showingAllComments) {
          if (post.comments.length > this._limitComments) {
            post.comments = post.comments
              .reverse()
              .filter((comment, index) => index < this._limitComments)
              .sort((a, b) => a.id - b.id)
          } else {
            this.showingAllComments = true
          }
        }

        return post
      })
    )
  }

  ngOnInit(): void {}

  public loadAllComments(): void {
    this.showingAllComments = true
    this._updatePost.next(true)
  }

  public addComment(comment: Comments): void {
    this._commentService
      .addComment$(comment)
      .pipe(take(1))
      .subscribe(
        () => this._updatePost.next(true),
        (err) => console.error(err)
      )
  }

  ngOnDestroy() {
    this._destroy$.next(null)
    this._destroy$.complete()
    this._destroy$.unsubscribe()
  }
}
