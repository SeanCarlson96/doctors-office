import { Component, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Appointment } from 'src/data/appointment';

@Component({
  selector: 'app-appt-block',
  templateUrl: './appt-block.component.html',
  styleUrls: ['./appt-block.component.css']
})
export class ApptBlockComponent {
  @Input() ablock: Appointment = new Appointment(-1, '', '', new Date(), new Date(), false)
  private ui: UiService
  public isDoctor: boolean = false

  constructor(ui: UiService) {
    this.ui = ui
    if(ui.userRole === 'Doctor'){
      this.isDoctor = true
    }
   }

  deleteAppt(){
    this.ui.deleteApptById(this.ablock)
  }

  confirmAppt(){
    this.ui.confirmAppt(this.ablock)
  }

}
