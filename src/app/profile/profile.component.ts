import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userDetails
  constructor(private location: Location,private login:LoginService) { }

  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails();
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
