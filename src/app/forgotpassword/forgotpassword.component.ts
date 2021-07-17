import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private location: Location, private login: LoginService,private router: Router) { }
  email = new FormControl('', Validators.required)
  newpass = new FormControl('', Validators.required)
  otp = new FormControl('', Validators.required)
  isError = false
  ErroMsg
  isOTP = true
  x_id 
  ngOnInit(): void {
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  checkuser() {
    if (this.email.valid) {
      let temp =
      {
        "email": this.email.value
      }


      this.login.checkuser(temp).subscribe(res => {
        console.log(res)
        if(res['success'] == true){
          this.isOTP = false
          this.isError = false
          this.x_id = res['x_id']
        }else{
          this.ErroMsg = res['error']['message']
          this.isError = true
        }
      })
    } else {
      this.ErroMsg = "Please Enter Email/Phone"
      this.isError = true
      
    }



  }

  UpdateP(){
    console.log();
    console.log();
    if(this.newpass.valid && this.otp.valid){
      let tmp = {
        "new_password" : this.newpass.value,
        "otp": parseInt(this.otp.value)
    }
    
    this.login.updatePass(tmp,this.x_id).subscribe(res=>{
      console.log(res)
      if(res['success'] == true){
        this.router.navigate(['/login']);
      }else{
        this.ErroMsg = res['error']['message']
        this.isError = true
      }

    })
    }else{
      this.ErroMsg = "Please Enter all details"
      this.isError = true
    }
    
  

  }
}
