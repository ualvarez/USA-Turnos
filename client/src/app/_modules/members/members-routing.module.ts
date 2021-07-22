import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from 'src/app/_guards/prevent-unsaved-changes.guard';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: ':username', component: MemberDetailComponent },
  { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
