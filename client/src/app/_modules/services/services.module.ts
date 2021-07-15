import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';


import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';


@NgModule({
  declarations: [
    ServicesComponent,
    ServiceCardComponent,
    ServiceDetailComponent
  ],
  imports: [    
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
