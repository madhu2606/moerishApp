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
export class LoginComponent implements AfterViewInit {
  isvalid = false
  errortext= ''
  
  public auth2: any;
  constructor(
    private login:LoginService,
    private route: ActivatedRoute, 
    private router: Router,
    private zone: NgZone
  ) { }

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
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });


  Login(){
    console.log(this.loginForm.value)
    
     this.login.Login(this.loginForm.value).subscribe(
    res=>{
       console.log((res));
       if(res['status'] == 200){
          this.router.navigate(['/dashboard']);
       }else{
        this.isvalid = true
        this.loginForm.reset();
        this.errortext = res['error']
       }
      
      },
     error => {
      // this.isValidUser = this.isValidPass = false
      this.isvalid = true
       
      

    }
     );
  }
 

}
