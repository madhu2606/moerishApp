import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  msg = ''
  shwmsg = false
  constructor(
    private login:LoginService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }
ngOnInit(){
  $(document).ready(function(){
    var _originalSize = $(window).width() + $(window).height()
    $(window).resize(function(){
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
    
  RegisterForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
  });

  Register(){
      console.log(this.RegisterForm.value)
     
    
     this.login.Register(this.RegisterForm.value).subscribe(
    res=>{
      console.log(res)
        if(res['success'] == true){
          this.msg = "Registered Successfully"
        }else{
          this.msg = "User Already Exists"
          
        }
        this.shwmsg = true
        this.RegisterForm.reset
    
       
       
   
      });

  }

}
