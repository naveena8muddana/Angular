import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsDataService } from 'src/app/shared/services/patients-data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  public patientData: any = {};
  historyForm: FormGroup;
  submitted: boolean = false;
  public heightM2: any;
  public isNaN = Number.isNaN;
  public checkArray: FormArray;
  public selectedDrugIds;
  public selectedSurgeryIds;
  public patientId: any;
  public bmi: any;
  public smokingArr = [
    { name: 'Heavy Smoker', value: 'heavy-smoker' },
    { name: 'Moderate Smoker', value: 'moderate-smoker' },
    { name: 'Light Smoker', value: 'light-smoker' },
    { name: 'Casual Smoker', value: 'casual-smoker' },
    { name: 'Non-Smoker', value: 'non-smoker' }
  ];
  public drinkingArr = [
    { name: 'Heavy Drinker', value: 'heavy-drinker' },
    { name: 'Moderate Drinker', value: 'moderate-drinker' },
    { name: 'Light Drinker', value: 'light-drinker' },
    { name: 'Casual Drinker', value: 'casual-drinker' },
    { name: 'Non-Drinker', value: 'non-drinker' }
  ];
  public drugDataArr = [
    { name: 'Amphetamines', value: 'amphetamines', checked: false },
    { name: 'Heroine', value: 'heroine', checked: false },
    { name: 'Barbiturates', value: 'barbiturates', checked: false },
    { name: 'Marijuana', value: 'marijuana', checked: false },
    { name: 'Non Drugs', value: 'non-drugs', checked: false }
  ];
  public surgeryDataArr = [
    { name: 'Heart Surgery', value: 'heart-surgery' },
    { name: 'Breast Surgery', value: 'breast-surgery' },
    { name: 'Leg Surgery', value: 'leg-surgery' },
    { name: 'Arm Surgery', value: 'arm-surgery' },
  ];

  constructor(private activatedRoute: ActivatedRoute, private patientService: PatientsDataService, private fb: FormBuilder) {
    this.activatedRoute.params.subscribe(params => {
      this.patientId = params.id;
      this.getPatientDetails(params.id)
    });
  }

  ngOnInit(): void {
    this.historyForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bmi: [''],
      smoking: ['', Validators.required],
      drinking: ['', Validators.required],
      drugsArr: new FormArray([], Validators.required),
      drugs: new FormArray([]),
      surgeryArr: new FormArray([], Validators.required),
      surgery: new FormArray([]),
      name: [''],
      sex: [''],
      age: [''],
      checkIn: ['']
    })
    this.addCheckboxes();
  }

  get patientsFormArray() {
    return this.historyForm.controls.drugsArr as FormArray;
  }

  get surgeryFormArray() {
    return this.historyForm.controls.surgeryArr as FormArray;
  }

  private addCheckboxes() {
    console.log('this.patientsFormArray', this.patientsFormArray)
    this.drugDataArr.forEach(() => this.patientsFormArray.push(new FormControl(false)));
    this.surgeryDataArr.forEach(() => this.surgeryFormArray.push(new FormControl(false)))
  }

  getPatientDetails(id) {
    this.patientService.getPatientData(id).subscribe((res) => {
      if (res) {
        this.patientData = res;
        console.log('this.historyForm.controls', this.historyForm.controls, this.patientData)
        this.patientData.surgery.map((r) => {
          console.log(r)
          this.surgeryDataArr.filter((e, i) => {
            console.log('this.historyForm.controls.surgeryArr', this.surgeryFormArray.controls[0])
            if (e.value == r) {
              this.surgeryFormArray.controls[i].patchValue(new FormControl(true));
            } else {
              this.surgeryFormArray.controls[i].patchValue(new FormControl(false));
            }
          })
          console.log('surgeryDataArr', this.surgeryDataArr, this.surgeryFormArray)
        })
        console.log('this.historyForm.controls.surgeryArr', this.surgeryFormArray, this.historyForm.controls.surgeryArr)
        this.historyForm.controls.name.setValue(this.patientData.name)
        this.historyForm.controls.sex.setValue(this.patientData.sex)
        this.historyForm.controls.age.setValue(this.patientData.age)
        this.historyForm.controls.checkIn.setValue(this.patientData.checkIn)
        this.historyForm.controls.height.setValue(this.patientData.height)
        this.historyForm.controls.weight.setValue(this.patientData.weight)
        this.historyForm.controls.bmi.setValue(this.patientData.bmi)
        this.historyForm.controls.smoking.setValue(this.patientData.smoking)
        this.historyForm.controls.drinking.setValue(this.patientData.drinking)
        // this.historyForm.controls.drugs.setValue(this.patientData.drugs)
        // this.historyForm.controls.surgery.setValue(this.patientData.surgery)
        console.log('this.historyForm', this.historyForm)
      }
    });
  }

  calculateHeightWeight() {
    this.heightM2 = (this.historyForm.value.height / 100) * (this.historyForm.value.height / 100)
    if (Number.isNaN(this.heightM2)) {
      this.heightM2 = null
    }
    this.bmi = (this.historyForm.controls.weight.value / this.heightM2).toFixed(2)
  }


  savePatientHistory() {
    this.selectedDrugIds = this.historyForm.value.drugsArr.map((checked, i) => checked ? this.drugDataArr[i].name : null).filter(v => v !== null);
    if (this.selectedDrugIds.length > 0) {
      this.selectedDrugIds.forEach(element => {
        this.historyForm.value.drugs.push(element)
      });
    }
    this.selectedSurgeryIds = this.historyForm.value.surgeryArr.map((checked, i) => checked ? this.surgeryDataArr[i].name : null).filter(v => v !== null);
    if (this.selectedSurgeryIds.length > 0) {
      this.selectedSurgeryIds.forEach(element => {
        this.historyForm.value.surgery.push(element)
      });
    }
    console.log('this.historyFormthis.historyForm.value', this.historyForm.value, this.historyForm, this.patientsFormArray)
    if (this.historyForm.valid) {
      delete this.historyForm.value.surgeryArr;
      delete this.historyForm.value.drugsArr;
      this.patientService.updatePatient(JSON.stringify(this.historyForm.value), this.patientId).subscribe((res) => {
        if (res) {
          this.patientService.displayToastr('success', 'Patient details updated successfully');
        }
      });

    } else {
      this.submitted = true;
    }
  }


  changeDrugError() {
    this.selectedDrugIds = this.historyForm.value.drugsArr.map((checked, i) => checked ? this.drugDataArr[i].name : null).filter(v => v !== null);
    console.log('this.selectedDrugIds', this.selectedDrugIds, this.historyForm.value)
    if (this.selectedDrugIds.length == 0) {
      this.historyForm.controls.drugs.setValue([])
      this.historyForm.value.drugs.pop()
    }
  }
  changeSurgeryError() {
    this.selectedSurgeryIds = this.historyForm.value.surgeryArr.map((checked, i) => checked ? this.surgeryDataArr[i].name : null).filter(v => v !== null);
    if (this.selectedSurgeryIds.length == 0) {
      this.historyForm.controls.surgery.setValue([])
      this.historyForm.value.surgery.pop()
    }
  }
}
