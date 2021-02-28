import { Component, Input, OnInit } from '@angular/core'
import { Comments } from '~types/comment'

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.scss'],
})
export class CommentShowComponent implements OnInit {
  @Input() public data!: Comments // ! is dangerous...

  constructor() {}

  ngOnInit(): void {}
}
