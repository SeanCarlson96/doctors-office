import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Appointment } from 'src/data/appointment';
import { Availability } from 'src/data/availability';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, OnDestroy {
  public doctor: Doctor | Patient
  @Output() close = new EventEmitter<void>()
  public availability: Availability[]
  public appointments: Appointment[]
  public availBlock: Availability = new Availability(-1, new Date(), new Date())
  private ui: UiService
  private availSubscription: Subscription
  private apptSubscription: Subscription

  constructor(ui: UiService){
    this.ui = ui
    this.doctor = ui.currentUser
    this.availability = ui.currentUser.availability
    this.appointments = ui.currentUser.appointments
    this.availSubscription = ui
      .whenAvailUpdates()
      .subscribe(availability => this.availability = availability)
    this.apptSubscription = ui
      .whenApptUpdates()
      .subscribe(appointments => this.appointments = appointments)
    console.log(this.appointments)
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.availSubscription.unsubscribe()
    this.apptSubscription.unsubscribe()
  }

  logout(){
    this.close.emit()
  }

  newStart(start: string){
    this.availBlock.startTime = new Date(start)
  }
  newEnd(end: string){
    this.availBlock.endTime = new Date(end)
  }
  addChunk(){
    this.ui.addBlock({
      ...this.availBlock,
      id: Math.random(),
    })
  }
}
