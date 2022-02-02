import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

@NgModule({
  declarations: [PatientListComponent, PatientHistoryComponent],
  imports: [
    SharedModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
