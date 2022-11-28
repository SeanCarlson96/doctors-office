import { Injectable } from '@angular/core';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { Availability } from 'src/data/availability';
import { Appointment } from 'src/data/appointment';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public doctors: Doctor[] = []
  public patients: Patient[] = []
  public currentUser: Doctor | Patient = new Doctor(-1, '', [], [], '', '')
  public userRole: string | null = null
  private doctorsSubject: Subject<Doctor[]> = new Subject()
  private patientsSubject: Subject<Patient[]> = new Subject()
  private http: HttpClient
  private availSubject: Subject<Availability[]> = new Subject()
  private apptSubject: Subject<Appointment[]> = new Subject()
  private availApptSubject: Subject<Appointment[]> = new Subject()
  public apptDoctor: Doctor = new Doctor(-1, '', [], [], '', '')
  public allAvail: Appointment[] = []

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

  updateAllAvail(): void {
    for(let i = 0; i < this.doctors.length; i++){
      for(let j=0; j < this.doctors[i].availability.length; j++){
        let block = this.doctors[i].availability[j]
        let toAppt = new Appointment(Math.random(), this.doctors[i].name, '', block.startTime, block.endTime, false)
        this.allAvail.push(toAppt)
      }
    }
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
        }
      }
    } else {console.log('error')}
  }

  addBlock(block: Availability): void{
    this.currentUser.availability.push(block)
    let updateDocAvail: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)

    this.http
      .patch('http://localhost:3000/doctors/' + this.currentUser?.id, updateDocAvail)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }

  whenAvailUpdates(): Observable<Availability[]>{
    return this.availSubject.asObservable()
  }
  whenApptUpdates(): Observable<Appointment[]>{
    return this.apptSubject.asObservable()
  }
  whenAvailApptUpdates(): Observable<Appointment[]>{
    return this.availApptSubject.asObservable()
  }
  
  deleteAvailById(block: Availability){
    let index = this.currentUser.availability.indexOf(block)
    this.currentUser.availability.splice(index, 1)
    let updateDocAvail: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:3000/doctors/' + this.currentUser?.id, updateDocAvail)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }

  
  deleteApptById(block: Appointment){
    let index = this.currentUser.appointments.indexOf(block)
    this.currentUser.appointments.splice(index, 1)
    let updateDocAppt: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:3000/doctors/' + this.currentUser?.id, updateDocAppt)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }

  confirmAppt(block: Appointment){
    let index = this.currentUser.appointments.indexOf(block)
    this.currentUser.appointments[index].confirmed = true
    let updateDocAppt: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:3000/doctors/' + this.currentUser?.id, updateDocAppt)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }

  addApptToUsers(appt: Appointment){
    this.currentUser.appointments.push(appt)
    let updatePatAppts: Patient = new Patient(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:3000/patients/' + this.currentUser?.id, updatePatAppts)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())

    //push appt into appt array for doctor where appt doctor name = doctor name
    this.http
      .get<Doctor>('http://localhost:3000/doctors/' + appt.doctor)
      .pipe(take(1))
      .subscribe(doctor => {
        this.apptDoctor = doctor
      })
    this.apptDoctor.appointments.push(appt)
    let updateApptDoctor: Doctor = new Doctor(this.apptDoctor.id, this.apptDoctor.name, 
      this.apptDoctor.availability, this.apptDoctor.appointments, 
      this.apptDoctor.username, this.apptDoctor.password)
    this.http
      .patch('http://localhost:3000/doctors/' + this.apptDoctor.id, updateApptDoctor)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }
}
