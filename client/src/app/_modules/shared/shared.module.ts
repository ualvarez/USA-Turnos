import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../../_interceptors/loading.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import {strings as spanishStrings} from 'ngx-timeago/language-strings/es';

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
  }


@NgModule({
  declarations: [  
    TextInputComponent, DateInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    })

  ],
  exports: [
    FormsModule,
    BsDropdownModule,
    ToastrModule,
    CommonModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    TextInputComponent,
    BsDatepickerModule,
    DateInputComponent,
    PaginationModule,
    ButtonsModule,
    TimeagoModule


  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]

})
export class SharedModule { 

  constructor(intl: TimeagoIntl) {
    intl.strings = spanishStrings;
    intl.changes.next();
  }
}
