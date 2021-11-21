import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg = '';
  shwmsg = false;
  constructor(
    private login: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    $(document).ready(function () {
      var _originalSize = $(window).width() + $(window).height();
      $(window).resize(function () {
        if ($(document).width() + $(document).height() == _originalSize) {
          $('.sec-two').css('position', 'absolute');
        } else if (
          $(document).width() + $(document).height() !=
          _originalSize
        ) {
          $('.sec-two').css('position', 'relative');
        } else {
          $('.sec-two').css('position', 'absolute');
        }
      });
    });
  }

  RegisterForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
      ),
    ]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[456789][0-9]{9}'),
    ]),
  });

  Register() {
    console.log(this.RegisterForm.value);
    if (this.RegisterForm.valid) {
      this.login.Register(this.RegisterForm.value).subscribe((res) => {
        console.log(res);
        if (res['success'] == true) {
          // this.msg = "Registered Successfully"
          $('#myModal').modal('show');
          setTimeout(() => {
            setTimeout(() => {
            
              this.router.navigate(['/login']);
            });
          }, 2000);
        } else {
          // this.msg = "User Already Exists"
          $('#failedModal').modal('show');
         
        
         
          setTimeout(function () {
            $('#failedModal').modal('hide');
           
          }, 2000);
        }
        this.shwmsg = true;
        this.RegisterForm.reset;
      });
    } else {
      console.log('invalid');
    }
  }
}
