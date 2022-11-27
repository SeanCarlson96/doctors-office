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
  public currentUser: Doctor | Patient | null = null
  public userRole: string | null = null
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

  private logIn: () => void = (): void => {return};
  loggingIn(fn: () => void) {
    this.logIn = fn
  }

  checkCredentials(role: string, username: string, password: string) {
    if(role === 'Doctor'){
      for(let i = 0; i < this.doctors.length; i++){
        if(this.doctors[i].username === username && this.doctors[i].password === password){
          this.currentUser = this.doctors[i]
          this.userRole = 'Doctor'
          this.logIn()
        }
      }
    } else if (role === 'Patient'){
      for(let i = 0; i < this.patients.length; i++){
        if(this.patients[i].username === username && this.patients[i].password === password){
          this.currentUser = this.patients[i]
          this.userRole = 'Patient'
          this.logIn()
          console.log('guy')
        }
      }
    } else {console.log('error' + role + " " + username + " " + password)}
  }
}
