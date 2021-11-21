import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems 
  sum = 0
  cartcount = 0
  userDetails
  constructor(
    private router:Router,
    private item:ItemsService, private login:LoginService

  ) { }

  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails();
    if(localStorage.getItem('cart') == null){
      this.getScart()
    }else{
      this.cartItems = JSON.parse(localStorage.getItem('cart'))
      this.item.addTocart(this.userDetails.id,this.cartItems).subscribe(res=>{
        console.log(res)
      })
    }
    // this.cartItems = JSON.parse(localStorage.getItem('cart')) != null?JSON.parse(localStorage.getItem('cart')):this.getScart()
    // this.cartItems = this.getScart()
    // console.log(this.cartItems)
   
    this.getSum();
    this.getCount();
  }

  getScart(){
    this.item.getCart(this.userDetails.id).subscribe(res=>{
      if(res.hasOwnProperty('data')){
        console.log(JSON.parse(res['data'][0]['item']))
        this.cartItems = JSON.parse(res['data'][0]['item'])
        localStorage.setItem('cart',JSON.stringify(this.cartItems))
        this.getSum();
    this.getCount();
      }else{
        this.cartItems = []
        localStorage.setItem('cart',JSON.stringify(this.cartItems))
        this.getSum();
    this.getCount();
      }
     
    })
  }
  getSum(){
    if(this.cartItems.length >0){
    this.sum = this.cartItems.reduce(function (sum, i) {
      return sum + i.quantity *(i.item.item_cost -i.item.item_discount)
  }, 0);
}else{
  return this.sum
}
  }
  getCount(){
    this.cartcount  = this.cartItems.length
  }
  addCart(id,add){
    console.log(id,add)
    let p = this.cartItems.filter(function (item) {
      return item.item_id === id;
  });
   
  // console.log(p)

    if(add == 'add'){
    if(p.length != 0){
      this.cartItems.forEach(e => {
          if(e.item_id == id){
            e.quantity = e.quantity+1
          }
      });
      
    }
   
      
    }else{
      if(p.length!= 0){
        this.cartItems.forEach((e,i) => {
          if(e.item_id == id){
            if(e.quantity > 1){
              e.quantity = e.quantity -1
             
            }else{
              this.cartItems.splice(i, 1);
            }
          }
      });
     
      }
      
    }
    console.log(this.cartItems)
    this.getSum()
    this.getCount()
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
    this.item.addTocart(this.userDetails.id,this.cartItems).subscribe(res=>{
      console.log(res)
    })
  }

  check(){
    this.router.navigate(['/checkout']);
  }
}
