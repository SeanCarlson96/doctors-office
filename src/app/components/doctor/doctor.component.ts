import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Availability } from 'src/data/availability';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  public doctor: Doctor | Patient
  @Output() close = new EventEmitter<void>()
  public availability: Availability[]
  public availBlock: Availability = new Availability(-1, null, null)
  private ui: UiService
  private availSubscription: Subscription

  constructor(ui: UiService){
    this.ui = ui
    this.doctor = ui.currentUser
    this.availability = ui.currentUser.availability
    this.availSubscription = ui
      .whenAvailUpdates()
      .subscribe(availability => this.availability = availability)
  }

  logout(){
    this.close.emit()
  }

  newStart(start: string){
    this.availBlock.startTime = new Date(start)
    console.log(start)
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
