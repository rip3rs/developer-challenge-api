import { Component, Input, OnInit } from '@angular/core'
import { Comment } from '~types/post'

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.scss'],
})
export class CommentShowComponent implements OnInit {
  @Input() public data!: Comment // ! is dangerous...

  constructor() {}

  ngOnInit(): void {}
}
