import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { LoginService } from '../services/login.service';
declare var $: any;
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
@Input() data
@Output() messageEvent = new EventEmitter();
@Output() addEvent = new EventEmitter();
imageUrl = environment.url.imageUrl
itemList
ReviewList
cartcount
userDetails
cartItems = []
avgR = 0

  constructor(private location:Location,private item:ItemsService, private login: LoginService) { }

  ngOnInit(): void {
    this.userDetails = this.login.getUserDetails();
    this.cartItems =
    JSON.parse(localStorage.getItem('cart')) != null
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    console.log(this.data)
    this.getItems([this.data.cat_id])
    this.getRev(this.data.item_id)
    this.getCount()
  }
  getCount() {
    this.cartcount = this.cartItems.length;
  }

  getRev(id){
    this.item.getReviews(id).subscribe(res=>{
      // console.log('res')
      // console.log(res)
      if(res['success'] == true){

        this.ReviewList = res['data']
        this.ReviewList.forEach(e => {
          e.rating = parseInt(e.rating)
          this.avgR = this.avgR+e.rating
          
        });
        this.avgR = Math.floor(this.avgR/this.ReviewList.length)
      
      }
    })
  }
  counter(i: number) {
    if(i>0){
      return new Array(i);
    }
    
}
 

  back() {
    this.messageEvent.emit()
  }

  addReview(){
   let bdy = 
    {
      "item_id": this.data.item_id,
      "rating":parseInt($('input[name="rating"]:checked').val()),
      "review":$('.comment').val(),
      "review_name":this.userDetails.name
  }
  
  console.log(bdy)
  this.item.AddReviews(bdy).subscribe(res=>{
    console.log(res)
    $('#form').modal('hide')
    this.getRev(this.data.item_id)
  })
  // $('#form').modal('hide')
  }
  addCart(id,add){
    let bdy = {
      id:id,
      add:add
    }
    this.addEvent.emit(bdy)
    this.cartItems =
    JSON.parse(localStorage.getItem('cart')) != null
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    this.getCount()

  }
  getItems(id){
    this.item.getItems(id,'').subscribe(res=>{
      console.log(res)
      if(res['success'] == true){

        this.itemList = res['data']
      //   this.itemList.forEach(e => {
      //     let p = this.cartItems.filter(function (item) {
      //       return item.item_id === e.item_id;
      //   });
      //   if(p.length !=0){
      //     e['addQuant'] = p[0].quantity
      //   }else{

      //     e['addQuant'] = 'Add'
      //   }

      // });
     
      }
    })
  }
}
