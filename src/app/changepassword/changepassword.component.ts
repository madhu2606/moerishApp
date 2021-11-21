import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  newpass
  userDetails
  constructor(private login:LoginService,private location:Location) { }

  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails()
  }
  back(){
    this.location.back();
  }
  updatePass(){
    if(this.newpass != ''){
      let bdy = {
        id:this.userDetails.id,
        pass:btoa(this.newpass.trim())
      }
      this.login.updatePass(bdy).subscribe(res=>{
        console.log(res)
        if(res['success']){
          $('#myModal').modal('show');
          this.newpass = '';
        }
      })
    }else{
      alert('Please provide passowrd')
    }
  }

}
