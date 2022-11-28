import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Appointment } from 'src/data/appointment';
import { Availability } from 'src/data/availability';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {
  public patient: Doctor | Patient
  @Output() close = new EventEmitter<void>();
  public appointments: Appointment[]
  private apptSubscription: Subscription
  private availApptSubscription: Subscription
  public availAppts: Appointment[]

  constructor(ui: UiService){
    ui.updateAllAvail()
    this.availAppts = ui.allAvail
    this.patient = ui.currentUser
    this.appointments = ui.currentUser.appointments
    this.apptSubscription = ui
      .whenApptUpdates()
      .subscribe(appointments => this.appointments = appointments)
    this.availApptSubscription = ui
      .whenAvailApptUpdates()
      .subscribe(availAppointments => this.availAppts = availAppointments)
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.apptSubscription.unsubscribe()
    this.availApptSubscription.unsubscribe()
  }

  logout(){
    this.close.emit()
  }
}
