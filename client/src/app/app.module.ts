import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { SharedModule } from './_modules/shared.module';



@NgModule({
  declarations: [
    AppComponent, 
    NavComponent, NavHeaderComponent, HomeComponent, RegisterComponent, ServiceListComponent, ServiceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),       
    FormsModule,
    SharedModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  

}
