import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostComponent } from './post.component'
import { PostRoutingModule } from './post-routing.module'
import { ComponentsModule } from '@components/components.module'
import { StringToHtmlDirective } from 'src/app/directives/parse-string-html.directive'

@NgModule({
  declarations: [PostComponent, StringToHtmlDirective],
  imports: [CommonModule, PostRoutingModule, ComponentsModule],
})
export class PostModule {}
