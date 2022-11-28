import { Component, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Appointment } from 'src/data/appointment';

@Component({
  selector: 'app-avail-appts',
  templateUrl: './avail-appts.component.html',
  styleUrls: ['./avail-appts.component.css']
})
export class AvailApptsComponent {
  @Input() anappt: Appointment = new Appointment(-1, '', '', new Date(), new Date(), false)
  private ui: UiService

  constructor(ui: UiService) {
    this.ui = ui
   }

   onSchedule(){
    this.ui.addApptToUsers(this.anappt)
   }
}
