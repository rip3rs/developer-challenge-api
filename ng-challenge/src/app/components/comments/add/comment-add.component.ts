import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { getNowDateFormated } from 'src/app/utils/date'
import { Post } from '~types/post'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Comments } from '~types/comment'

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnInit {
  @Output()
  public comment: EventEmitter<Comments> = new EventEmitter<Comments>()
  @Input() public post!: Post
  public form: FormGroup
  public paperPlaneIcon = faPaperPlane

  constructor(private _fb: FormBuilder) {
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

    const data: Comments = {
      ...this.form.value,
      postId: this.post.id,
      date: getNowDateFormated(),
    }

    this.comment.emit(data)
    this.form.reset()
  }
}
