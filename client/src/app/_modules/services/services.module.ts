import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';


import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServicePhotoEditorComponent } from './service-photo-editor/service-photo-editor.component';


@NgModule({
  declarations: [
    ServicesComponent,
    ServiceCardComponent,
    ServiceDetailComponent,
    ServiceEditComponent,
    ServicePhotoEditorComponent
  ],
  imports: [    
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
