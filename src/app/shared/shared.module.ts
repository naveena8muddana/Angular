import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

//plugins
import { AgGridModule } from 'ag-grid-angular';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(en);

//modals
import { AddPatientComponent } from './modals/add-patient/add-patient/add-patient.component';
import { DeletePatientComponent } from './modals/delete-patient/delete-patient/delete-patient.component';

//components
import { ButtonRendererComponent } from './components/button-rederer.component';

@NgModule({
  declarations: [
    //modals
    AddPatientComponent,
    DeletePatientComponent,
    //components
    ButtonRendererComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzToolTipModule,
    ToastrModule.forRoot({ timeOut: 2000, extendedTimeOut: 2000 }),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzToolTipModule,
    ToastrModule,
    //modals
    AddPatientComponent,
    DeletePatientComponent
  ],
  providers: [BsModalRef, DatePipe, { provide: NZ_I18N, useValue: en_US }],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
