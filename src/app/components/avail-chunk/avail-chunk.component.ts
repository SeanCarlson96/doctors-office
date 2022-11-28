import { Component, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Availability } from 'src/data/availability';

@Component({
  selector: 'app-avail-chunk',
  templateUrl: './avail-chunk.component.html',
  styleUrls: ['./avail-chunk.component.css']
})
export class AvailChunkComponent {
  @Input() achunk: Availability = new Availability(-1, null, null)
  private ui: UiService

  constructor(ui: UiService) {
    this.ui = ui
   }

  deleteAvail(){
    this.ui.deleteAvailById(this.achunk)
  }
}
