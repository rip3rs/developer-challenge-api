import { NgModule } from '@angular/core'
import { SideMenuComponent } from './side-menu/side-menu.component'
import { CardComponent } from './card/card.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommentAddComponent } from './comments/add/comment-add.component'
import { CommentShowComponent } from './comments/show/comment-show.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

const COMPONENTS = [CardComponent, SideMenuComponent, CommentShowComponent, CommentAddComponent]

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
