import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = []
  sum
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart')) != null?JSON.parse(localStorage.getItem('cart')):[]
    this.getSum()
  }
  getSum(){
    this.sum = this.cartItems.reduce(function (sum, i) {
      return sum + i.quantity *(i.item.item_cost -i.item.item_discount)
  }, 0);
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
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }

  check(){
    this.router.navigate(['/checkout']);
  }
}
