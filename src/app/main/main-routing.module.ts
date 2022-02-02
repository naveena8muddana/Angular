import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'patient-list', pathMatch: 'full' },
  { path: 'patient-list', component: PatientListComponent, pathMatch: 'full' },
  { path: 'patient-history/:id', component: PatientHistoryComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
