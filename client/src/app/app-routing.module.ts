import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      {path: 'services', component: ServiceListComponent, canActivate: [AuthGuard]},
      {path: 'service/:id', component: ServiceDetailComponent}
    ]
  },
 
  {path: '**', component: HomeComponent,pathMatch: 'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
