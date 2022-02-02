import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddPatientComponent } from 'src/app/shared/modals/add-patient/add-patient/add-patient.component';
import { Patients } from 'src/app/shared/services/patients';
import { PatientsDataService } from 'src/app/shared/services/patients-data.service';
import { DatePipe } from '@angular/common'
import { ButtonRendererComponent } from '../../shared/components/button-rederer.component';
import { DeletePatientComponent } from 'src/app/shared/modals/delete-patient/delete-patient/delete-patient.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  frameworkComponents: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', resizable: true, },
    { headerName: 'Age', field: 'age', width: 80, resizable: true, },
    { headerName: 'Sex', field: 'sex', resizable: true, },
    { headerName: 'Check-In', field: 'checkIn', resizable: true, },
    {
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this),
        label: 'Edit',
      },
      resizable: true,
    },
    {
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteButtonClick.bind(this),
        label: 'Delete',
      },
      width: 10
    },
    {
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onSaveButtonClick.bind(this),
        label: 'Patient'
      },
      width: 10
    },
  ];
  public loadingTemplate;
  public noRowsTemplate;
  public overlayNoRowsTemplate;
  public rowData = [];
  public modalRefData: any;
  public modalRefEditData: any;

  patients: Patients[] = [];

  constructor(private patientsService: PatientsDataService, public modalService: BsModalService, public modalRef: BsModalRef, private DatePipe: DatePipe, public router: Router) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(): void {
    this.patientsData();
  }
  drop() {
    console.log('button clicked')
  }
  patientsData() {
    this.patientsService.getPatientsList().subscribe((res) => {
      console.log('res', res)
      res.map((result) => {
        console.log('result', result)
        result.checkIn = this.DatePipe.transform(result.checkIn, 'MM/dd/yyyy');
      })
      this.rowData = res;

      if (!this.rowData) {
        console.log('enter')
        this.overlayNoRowsTemplate = `"<span">no rows to show</span>"`;
      }
    })
  }

  openPatientModal(id?) {
    this.modalRefData = this.modalService.show(AddPatientComponent);
    this.modalRefData.content.event.subscribe((res) => {
      if (res) {
        this.patientsData();
      }
    })
  }


  onEditButtonClick(params) {
    console.log('edit', params, params.data, params.data.id)
    const initialState: ModalOptions = {
      initialState: {
        data: params.data
      }
    }
    this.modalRefEditData = this.modalService.show(AddPatientComponent, initialState);
    this.modalRefEditData.content.event.subscribe((res) => {
      if (res) {
        this.patientsData();
      }
    })
  }

  onSaveButtonClick(params) {
    this.router.navigate(['main/patient-history/' + params.data.id])
  }

  onDeleteButtonClick(params) {
    console.log('edit', params, params.data, params.data.id)
    const initialState: ModalOptions = {
      initialState: {
        data: params.data
      }
    }
    this.modalRefEditData = this.modalService.show(DeletePatientComponent, initialState);
    this.modalRefEditData.content.event.subscribe((res) => {
      if (res) {
        this.patientsData();
      }
    })
  }

}
