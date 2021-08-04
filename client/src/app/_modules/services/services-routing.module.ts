import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [{ path: '', component: ServicesComponent },
{path: ':name', component: ServiceDetailComponent},
{path: 'edit/:name', component: ServiceEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
