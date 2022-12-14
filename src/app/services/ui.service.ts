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
  public userRole: string = ''
  private doctorsSubject: Subject<Doctor[]> = new Subject()
  private patientsSubject: Subject<Patient[]> = new Subject()
  private http: HttpClient
  private availSubject: Subject<Availability[]> = new Subject()
  private apptSubject: Subject<Appointment[]> = new Subject()
  private availApptSubject: Subject<Appointment[]> = new Subject()
  public apptDoctor: Doctor = new Doctor(-1, '', [], [], '', '')
  public allAvail: Appointment[] = []
  public pat: Patient = new Patient(-1, '', [], [], '', '')
  public doc: Doctor = new Doctor(-1, '', [], [], '', '')

  constructor(http: HttpClient) {
    this.http = http
    this.updateDoctors()
    this.updatePatients()
  }

  updateDoctors(): void {
    this.http
      .get<Doctor[]>('http://localhost:8080/doctors')
      .pipe(take(1))
      .subscribe(doctors => {
        this.doctors = doctors
        this.doctorsSubject.next(this.doctors)
      })
  }

  updatePatients(): void {
    this.http
      .get<Patient[]>('http://localhost:8080/patients')
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
      .post('http://localhost:8080/doctors', doctor)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
    this.doctors.push(doctor)
  }

  addPatient(patient: Patient){
    this.http
      .post('http://localhost:8080/patients', patient)
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
      .patch(`http://localhost:8080/doctors/${this.currentUser.id}`, updateDocAvail)
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
      .patch('http://localhost:8080/doctors/' + this.currentUser?.id, updateDocAvail)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
  }


  findParties(role: string, appt: Appointment): void{
    if(role === 'Patient'){
      for(let i = 0; i < this.doctors.length; i++){
        let doctor = this.doctors[i]
        if(doctor.name = appt.doctor){
          this.doc = new Doctor(doctor.id, doctor.name, doctor.availability, doctor.appointments, doctor.username, doctor.password)
        }
      }
    } else if (role === 'Doctor'){
      for(let i = 0; i < this.patients.length; i++){
        let patient = this.patients[i]
        if(patient.name = appt.patient){
          this.pat = new Patient(patient.id, patient.name, patient.availability, patient.appointments, patient.username, patient.password)
        }
      }
    } else {console.log('error')}
  }

  deleteApptByIdDoc(block: Appointment){
    this.findParties(this.userRole, block)

    //push availability chunk back into doctor availability
    this.currentUser.availability.push(new Availability(Math.random(), block.start, block.end))

    let index = this.currentUser.appointments.indexOf(block)
    this.currentUser.appointments.splice(index, 1)
    let updateDocAppt: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:8080/doctors/' + this.currentUser?.id, updateDocAppt)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
    let index2 = this.pat.appointments.indexOf(block)
    this.pat.appointments.splice(index2, 1)
    let updatePatAppt: Patient = 
    new Patient(this.pat.id, this.pat.name, 
      this.pat.availability, this.pat.appointments, 
      this.pat.username, this.pat.password)
    this.http
      .patch('http://localhost:8080/patients/' + this.pat?.id, updatePatAppt)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())
    this.updateAllAvail()
  }
  deleteApptByIdPat(block: Appointment){
    this.findParties(this.userRole, block)

    //push availability chunk back into doctor availability
    this.doc.availability.push(new Availability(Math.random(), block.start, block.end))

    let index = this.doc.appointments.indexOf(block)
    this.doc.appointments.splice(index, 1)
    let updateDocAppt: Doctor = 
    new Doctor(this.doc.id, this.doc.name, 
      this.doc.availability, this.doc.appointments, 
      this.doc.username, this.doc.password)
    this.http
      .patch('http://localhost:8080/doctors/' + this.doc?.id, updateDocAppt)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())
    let index2 = this.currentUser.appointments.indexOf(block)
    this.currentUser.appointments.splice(index2, 1)
    let updatePatAppt: Patient = 
    new Patient(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:8080/patients/' + this.currentUser?.id, updatePatAppt)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())
  }

  confirmAppt(block: Appointment){
    this.findParties(this.userRole, block)
    let index = this.currentUser.appointments.indexOf(block)
    this.currentUser.appointments[index].confirmed = true
    let updateDocAppt: Doctor = 
    new Doctor(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:8080/doctors/' + this.currentUser?.id, updateDocAppt)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())

    for(let i = 0; i<this.pat.appointments.length; i++){
      if(this.pat.appointments[i].id === block.id){
        this.pat.appointments[i].confirmed = true
      }
    }
    let updatePatAppt: Patient = 
    new Patient(this.pat.id, this.pat.name, 
      this.pat.availability, this.pat.appointments, 
      this.pat.username, this.pat.password)
    this.http
      .patch('http://localhost:8080/patients/' + this.pat?.id, updatePatAppt)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())
  }

  addApptToUsers(appt: Appointment){
    this.findParties(this.userRole, appt)
    this.currentUser.appointments.push(appt)
    appt.patient = this.currentUser.name
    let updatePatAppts: Patient = new Patient(this.currentUser.id, this.currentUser.name, 
      this.currentUser.availability, this.currentUser.appointments, 
      this.currentUser.username, this.currentUser.password)
    this.http
      .patch('http://localhost:8080/patients/' + this.currentUser?.id, updatePatAppts)
      .pipe(take(1))
      .subscribe(() => this.updatePatients())

    //remove appt from doctors availability
    //find avaiability by using appt.start and appt.end find where both match
    for(let i = 0; i < this.doc.availability.length; i++){
      if(this.doc.availability[i].startTime === appt.start && this.doc.availability[i].endTime === appt.end){
        this.doc.availability.splice(i, 1)
      }
    }

    this.doc.appointments.push(appt)
    let updatedocAppts: Doctor = new Doctor(this.doc.id, this.doc.name, 
      this.doc.availability, this.doc.appointments, 
      this.doc.username, this.doc.password)
    this.http
      .patch('http://localhost:8080/doctors/' + this.doc?.id, updatedocAppts)
      .pipe(take(1))
      .subscribe(() => this.updateDoctors())

    this.updateAllAvail()
  }
}
