import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patients } from './patients';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {


  constructor(private http: HttpClient, public toastr: ToastrService) { }


  getPatientsList(): Observable<any> {
    return this.http.get<Patients[]>('http://localhost:3000/Patients/')
  }

  addPatient(body): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post('http://localhost:3000/Patients', body, { 'headers': headers });
  }

  updatePatient(body, id): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.put('http://localhost:3000/Patients/' + id, body, { 'headers': headers });
  }

  deletePatient(id): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.delete('http://localhost:3000/Patients/' + id, { 'headers': headers });
  }

  getPatientData(id): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.get('http://localhost:3000/Patients/' + id, { 'headers': headers });
  }

  displayToastr(type, title) {
    this.toastr[type](title)
  }
}
