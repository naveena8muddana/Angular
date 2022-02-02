import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PatientsDataService } from 'src/app/shared/services/patients-data.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm: FormGroup;
  submitted: boolean = false;
  public event: EventEmitter<any> = new EventEmitter();
  data?: any = {};
  public today = new Date();

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private patientService: PatientsDataService) {
  }


  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      sex: [''],
      checkIn: ['', Validators.required]
    })
    console.log('this.id', this.data)
    if (this.data.id) {
      this.patientForm.patchValue(this.data)
    }
  }

  addPatient() {
    if (this.patientForm.valid) {
      const headers = { 'content-type': 'application/json' }
      if (this.data.id) {
        this.patientService.updatePatient(JSON.stringify(this.patientForm.value), this.data.id).subscribe((res) => {
          if (res) {
            this.patientService.displayToastr('success', 'Patient details updated successfully');
            this.commonData();
          }
        });
      } else {
        this.patientService.addPatient(JSON.stringify(this.patientForm.value)).subscribe((res) => {
          if (res) {
            this.patientService.displayToastr('success', 'Patient added successfully');
            this.commonData();
          }
        });
      }
    } else {
      this.submitted = true;
    }
  }
  commonData() {
    this.event.emit(true);
    this.modalRef.hide();
  }
}
