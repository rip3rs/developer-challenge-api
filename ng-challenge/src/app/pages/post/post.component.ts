import { Component, OnInit } from '@angular/core'
import { CommentService } from '@services/comment.service'
import { PostService } from '@services/post.service'
import { Observable, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { Post } from '~types/post'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private _limitComments = 5
  public showingAllComments = false
  private _destroy$: Subject<any> = new Subject()
  public post$: Observable<Post | null>

  constructor(private _postService: PostService, private _commentService: CommentService) {
    this.post$ = this._postService.post$.pipe(
      takeUntil(this._destroy$),
      map((post) => {
        if (post.comments && !this.showingAllComments) {
          if (post.comments.length > this._limitComments) {
            post.comments = post.comments
              .reverse()
              .filter((comment, index) => index < this._limitComments)
              .sort((a, b) => a.id - b.id)
          }
        }

        return post
      })
    )
  }

  ngOnInit(): void {}

  public async loadAllComments(slug: string): Promise<void> {
    this.showingAllComments = true
    await this._postService.getOne$(slug).toPromise()
  }

  ngOnDestroy() {
    this._destroy$.next(null)
    this._destroy$.complete()
    this._destroy$.unsubscribe()
  }
}