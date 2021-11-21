import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userDetails
  constructor(private location: Location,private login:LoginService,private route:Router) { }

  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails();
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  Signout(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])

  }
}
