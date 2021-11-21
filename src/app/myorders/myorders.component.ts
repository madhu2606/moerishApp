import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  userDetails
  orders
  constructor(private location: Location,private login:LoginService,private item:ItemsService,private route:Router) { }
  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails();
    this.item.getOrder(this.userDetails.id).subscribe(res=>{
      console.log(res)
      this.orders = res['data']
    })
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getJSON(obj){
    return JSON.parse(obj)
  }

  trackOrder(id){
    this.route.navigateByUrl('/ordertrack?id='+id)
    
  }
}
