import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { AvailChunkComponent } from './components/avail-chunk/avail-chunk.component';
import { ApptBlockComponent } from './components/appt-block/appt-block.component';
import { AvailApptsComponent } from './components/avail-appts/avail-appts.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DoctorComponent,
    PatientComponent,
    AvailChunkComponent,
    ApptBlockComponent,
    AvailApptsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
