import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'
import { PostResolver } from '@resolvers/post.resolver'
import { Post } from '~types/post'
import { PostComponent } from './post.component'

interface PostRoute extends Route {
  data?: {
    posts: Post
  }
  children?: PostRoute[]
}

const routes: PostRoute[] = [
  {
    path: '',
    component: PostComponent,
    resolve: {
      post: PostResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
