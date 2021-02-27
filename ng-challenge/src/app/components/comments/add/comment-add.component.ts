import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommentService } from '@services/comment.service'
import { PostService } from '@services/post.service'
import { forkJoin } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { getNowDateFormated } from 'src/app/utils/date'
import { Comment, Post } from '~types/post'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnInit {
  @Input() public post!: Post
  public form: FormGroup
  public paperPlaneIcon = faPaperPlane

  constructor(private _fb: FormBuilder, private _commentService: CommentService, private _postService: PostService) {
    this.form = this._fb.group({
      user: ['', [Validators.required]],
      content: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {}

  public submit(): void {
    if (!this.form.valid) {
      return
    }

    const data: Comment = { ...this.form.value, postId: this.post.id, date: getNowDateFormated() }

    this._commentService
      .addComment$(data)
      .pipe(mergeMap((_) => forkJoin([this._postService.getAll$(), this._postService.getOne$(this.post.slug)])))
      .subscribe(
        () => {},
        (err) => console.error(err),
        () => this.form.reset()
      )
  }
}
