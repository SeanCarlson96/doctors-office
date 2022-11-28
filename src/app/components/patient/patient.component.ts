import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  public patient: Doctor | Patient | null
  @Output() close = new EventEmitter<void>();

  constructor(ui: UiService){
    this.patient = ui.currentUser
  }

  logout(){
    this.close.emit()
  }
}
