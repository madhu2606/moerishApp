import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


import 'rxjs/add/operator/map';
declare const gapi: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit,OnInit {
  isvalid = false
  errortext= ''
  otp
  showOTP = false
  wrngO = false
  
  public auth2: any;
  constructor(
    private login:LoginService,
    private route: ActivatedRoute, 
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit(){
    this.loginForm.get('otp').valueChanges.subscribe(res=>{
      console.log(res)
      if(res == this.otp && this.otp !=null){
        this.router.navigate(['/dashboard']);
      }else {
        if(res.length == 4){
        this.wrngO = true;
      }

      }
    })
  }

  ngAfterViewInit() {
    $(document).ready(function(){
			var _originalSize = $(window).width() + $(window).height()
      console.log(_originalSize)
			$(window).resize(function(){
          // console.log($(document).width() + $(document).height())
				if($(document).width() + $(document).height() == _originalSize){
					$(".sec-two").css("position","absolute"); 
				} else if($(document).width() + $(document).height() != _originalSize){
					$(".sec-two").css("position","relative");  
				} else{
					$(".sec-two").css("position","absolute");  
				}
			});
		});
  }

  loginForm = new FormGroup({
    username:  new FormControl('', [
      Validators.required,
      Validators.pattern('[456789][0-9]{9}'),
    ]),
    password: new FormControl('',Validators.required),
    otp:new FormControl('',Validators.required)
  });


  Login(){
    this.showOTP = true
    console.log(this.loginForm.value)
    
     this.login.Login(this.loginForm.value).subscribe(
    res=>{
      console.log('from login')
       console.log((res));
       if(res['status'] == 200){
         let det = this.login.getUserDetails();
        this.otp = det['otp']
      
        // console.log(this.otp)
          // this.router.navigate(['/dashboard']);
       }else{
        this.isvalid = true  
        this.showOTP = false

        this.loginForm.reset();
        this.errortext = res['error']
        $('#failedModal').modal('show')
       }
      
      },
     error => {
      // this.isValidUser = this.isValidPass = false
      this.isvalid = true
       
      

    }
     );
  }

  

}
