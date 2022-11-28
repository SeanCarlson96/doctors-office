import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/data/doctor';
import { Patient } from 'src/data/patient';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'doctorsOffice'
  notLoggedIn = true
  ui: UiService
  user: Doctor | Patient | null
  userRole: string | null = null

  constructor(ui: UiService){
    this.ui = ui
    this.user = null
    // this.user = ui.currentUser
    // if(this.user != null){
    //   this.notLoggedIn = false
    // }
  }

  ngOnInit(): void {
    this.ui.loggingIn(this.onLoggedIn.bind(this))
  }

  onLoggedIn():void {
    this.user = this.ui.currentUser
    this.notLoggedIn = false
    this.userRole = this.ui.userRole
  }

  logout(){
    this.notLoggedIn = true
    this.userRole = null
    this.user = null
  }

}
