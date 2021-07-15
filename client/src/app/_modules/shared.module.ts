import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { FormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  exports: [
    FormsModule,
    BsDropdownModule,
    ToastrModule,
    CommonModule,
    TabsModule,
    NgxGalleryModule

  ]

})
export class SharedModule { }
