import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
