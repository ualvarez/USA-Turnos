import { NgModule } from '@angular/core';


import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { SharedModule } from '../shared.module';
import { MemberDetailComponent } from './member-detail/member-detail.component';








@NgModule({
  declarations: [
    MembersComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    MembersRoutingModule,
    SharedModule
   
   
  ]
})
export class MembersModule { }
