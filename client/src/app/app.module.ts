import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';


import { SharedModule } from './_modules/shared/shared.module';
import { RegisterModule } from './_modules/register/register.module';









@NgModule({
  declarations: [AppComponent, NavComponent, NavHeaderComponent, HomeComponent, TestErrorsComponent, NotFoundComponent, ServerErrorComponent],
  imports: [AppRoutingModule, HttpClientModule, CollapseModule.forRoot(), SharedModule, RegisterModule, BrowserModule, BrowserAnimationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
