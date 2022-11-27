import { Component, ElementRef, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  @ViewChild('registerRole') registerRole: ElementRef = {} as ElementRef;
  @ViewChild('registerName') registerName: ElementRef = {} as ElementRef;
  @ViewChild('registerUsername') registerUsername: ElementRef = {} as ElementRef;
  @ViewChild('registerPassword') registerPassword: ElementRef = {} as ElementRef;
  resultMessage = ''
  public doctor: Doctor = new Doctor(-1, '', null, null, '', '')
  public patient: Patient = new Patient(-1, '', null, '', '')
  public role: string = ''

  private ui: UiService

  public liRole: string = ''
  public liUsername: string = ''
  public liPassword: string = ''

  constructor(ui: UiService){
    this.ui = ui
  }

  registeredRole(registerRole: string): void {
    this.role = registerRole
  }

  registeredName(registerName: string): void {
    if(this.role === 'Doctor'){
      this.doctor.name = registerName
    } else if(this.role === 'Patient'){
      this.patient.name = registerName
    }
  }

  registeredUsername(registerUsername: string): void {
    if(this.role === 'Doctor'){
      this.doctor.username = registerUsername
    } else if(this.role === 'Patient'){
      this.patient.username = registerUsername
    }
  }

  registeredPassword(registerPassword: string): void {
    if(this.role === 'Doctor'){
      this.doctor.password = registerPassword
    } else if(this.role === 'Patient'){
      this.patient.password = registerPassword
    }
  }

  clearInputs(){
    this.registerRole.nativeElement.value = 'Select a role';
    this.registerName.nativeElement.value = '';
    this.registerUsername.nativeElement.value = '';
    this.registerPassword.nativeElement.value = '';
 }

  onRegister() {
    if(this.role === 'Doctor'){
      this.ui.addDoctor({
        ...this.doctor,
        id: Math.random(),
      })
      this.resultMessage = 'Doctor successfully registered. Please log in.';
    } else if(this.role === 'Patient'){
      this.ui.addPatient({
        ...this.patient,
        id: Math.random(),
      })
      this.resultMessage = 'Patient successfully registered. Please log in.';
    } else {
      this.resultMessage = 'Something went wrong';
    }
    this.clearInputs()
  }


  setRole(liRole: string) {
    this.liRole = liRole
  }
  setUsername(liUsername: string) {
    this.liUsername = liUsername
  }
  setPassword(liPassword: string) {
    this.liPassword = liPassword
  }
  onLogIn() {
    this.ui.checkCredentials(this.liRole, this.liUsername, this.liPassword)
  }
}
