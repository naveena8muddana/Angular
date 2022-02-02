import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientsDataService } from 'src/app/shared/services/patients-data.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit {

  data?: any = {};
  public event: EventEmitter<any> = new EventEmitter();

  constructor(public modalRef: BsModalRef, private patientService: PatientsDataService) {
  }

  ngOnInit(): void {
    console.log('data', this.data)
  }

  deletePatient() {
    this.patientService.deletePatient(this.data.id).subscribe((res) => {
      if (res) {
        this.patientService.displayToastr('success', 'Patient deleted successfully');
        this.event.emit(true);
        this.modalRef.hide();
      }
    });
  }
}
