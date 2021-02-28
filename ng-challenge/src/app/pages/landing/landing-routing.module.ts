import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'
import { Post } from '~types/post'
import { LandingComponent } from './landing.component'

interface LandingRoute extends Route {
  data?: {
    posts: Post[]
  }
  children?: LandingRoute[]
}

const routes: LandingRoute[] = [
  {
    path: ':post',
    loadChildren: () => import('../post/post.module').then((m) => m.PostModule),
  },
  {
    path: '',
    component: LandingComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
