import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private login: LoginService,private router:Router) { }

  ngOnInit(): void {
    if(this.login.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }else{
      console.log('not logged in')
    }
  }

}
