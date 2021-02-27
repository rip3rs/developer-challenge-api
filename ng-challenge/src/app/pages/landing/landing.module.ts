import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingComponent } from './landing.component'
import { LandingRoutingModule } from './landing-routing.module'
import { ComponentsModule } from '@components/components.module'

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, ComponentsModule],
})
export class LandingModule {}
