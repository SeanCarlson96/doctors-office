import { Injectable } from '@angular/core';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public doctors: Doctor[] = []
  public patients: Patient[] = []
  private doctorsSubject: Subject<Doctor[]> = new Subject()
  private patientsSubject: Subject<Patient[]> = new Subject()
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
    this.updateDoctors()
    this.updatePatients()
  }

  updateDoctors(): void {
    this.http
      .get<Doctor[]>('http://localhost:3000/doctors')
      .pipe(take(1))
      .subscribe(doctors => {
        this.doctors = doctors
        this.doctorsSubject.next(this.doctors)
      })
  }

  updatePatients(): void {
    this.http
      .get<Patient[]>('http://localhost:3000/patients')
      .pipe(take(1))
      .subscribe(patients => {
        this.patients = patients
        this.patientsSubject.next(this.patients)
      })
  }


  addDoctor(doctor: Doctor){
    this.http
      .post('http://localhost:3000/doctors', doctor)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
    this.doctors.push(doctor)
  }

  addPatient(patient: Patient){
    this.http
      .post('http://localhost:3000/patients', patient)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())
    this.patients.push(patient)
  }
}
