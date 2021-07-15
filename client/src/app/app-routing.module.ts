import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,  runGuardsAndResolvers: 'always' }, 
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'services', loadChildren: () => import('./_modules/services/services.module').then(m => m.ServicesModule), canActivate: [AuthGuard] },
  { path: 'members', loadChildren: () => import('./_modules/members/members.module').then(m => m.MembersModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: () => import('./_modules/register/register.module').then(m => m.RegisterModule) },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
