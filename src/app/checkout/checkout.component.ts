import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems 
  sum
  payCard = 'cash'
  constructor(private location:Location) { }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart')) != null?JSON.parse(localStorage.getItem('cart')):[]
    this.getSum()
  }
  getSum(){
    this.sum = this.cartItems.reduce(function (sum, i) {
      return sum + i.quantity *(i.item.item_cost -i.item.item_discount)
  }, 0);
  }
  back(){
    this.location.back();
  }

}
