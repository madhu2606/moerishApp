import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemsService } from '../services/items.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
cat_id  = []
catCheck = new FormControl('')
All_cat = []
temp_Cat = []
sortView = false
category
itemList
userDetails
loadChild = false
childData 
cartItems = [
  // {
  //   "quantity":1,
  //   "item_id":4
  // }
 
]
  constructor(
    private item:ItemsService,
    private login:LoginService,
    private location:Location
  ) { }

  back(){
    this.location.back();
  }

  ngOnInit(): void {
    this.getAllCat()
    this.cartItems = JSON.parse(localStorage.getItem('cart')) != null?JSON.parse(localStorage.getItem('cart')):[]
    console.log(this.cartItems)

    this.userDetails = this.login.getUserDetails();
    console.log(this.userDetails)
  
    
  }
  getItems(){
    this.item.getItems(this.cat_id).subscribe(res=>{
      console.log(res)
      if(res['success'] == true){

        this.itemList = res['data']
        this.itemList.forEach(e => {
          let p = this.cartItems.filter(function (item) {
            return item.item_id === e.item_id;
        });
        if(p.length !=0){
          e['addQuant'] = p[0].quantity
        }else{

          e['addQuant'] = 'Add'
        }

      });
     
      }
    })
  }

  getAllCat(){
    this.All_cat = []
    this.cat_id = []
    this.item.getCategories().subscribe(res=>{
      console.log(res)
      if(res['success']){
        this.category = res['data'];
        this.category.forEach(e => {
          // console.log(e)
          e.isChecked = false
          this.All_cat.push(e)
          this.cat_id.push(e.id)
          
        });
        this.getItems()
      }
    })
  }

  addCart(id,add){
    console.log(id,add)
    let p = this.cartItems.filter(function (item) {
      return item.item_id === id;
  });
    let q = this.itemList.filter(function (item) {
      return item.item_id === id;
  });
  // console.log(p)

    if(add == 'add'){
    if(p.length != 0){
      this.cartItems.forEach(e => {
          if(e.item_id == id){
            if(e.quantity == 'Add'){
              e.quantity = 0
            }
            e.quantity = e.quantity+1
          }
      });
      
    }else{
      let temp = {
        "quantity":1,
        "item_id":id,
        "item":q[0]
      }
      this.cartItems.push(temp)
    }
    this.itemList.forEach(e => {
      if(e.item_id == id){
        if(e.addQuant == 'Add'){
          e.addQuant = 0
        }
        e.addQuant = e.addQuant+1
      }
  });
      
    }else{
      if(p.length!= 0){
        this.cartItems.forEach((e,i) => {
          if(e.item_id == id){
            if(e.quantity > 1){
              e.quantity = e.quantity -1
             
            }else{
              this.cartItems.splice(i, 1);
              e.quantity = 'Add'
            }
          }
      });
      this.itemList.forEach(e => {
        if(e.item_id == id){
          
          e.addQuant = e.addQuant-1
          if(e.addQuant == 0){
            e.addQuant = 'Add'
          }
        }
    });
      }
      
    }
    console.log(this.cartItems)
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }

  loadDesc(id){
    
    this.childData = id
    this.loadChild = true
  }

  receiveMessage($event) {
    this.loadChild = false
    this.childData = ''
  }
  addCrt($event) {
   this.addCart($event.id,$event.add)

  }
  ChnageFilter(){
    this.sortView = !this.sortView
    if(this.temp_Cat.length !=0){

      this.cat_id = this.temp_Cat
      this.getItems()
    }else{
      this.getAllCat()
    }
    // this.temp_Cat = []
    
 
   
  }
  checkChange(id,checked){
    // console.log(id,checked)
    // console.log(this.All_cat)
    this.All_cat.forEach((e,i)=>{
      if(e.id == id ){
       e['isChecked'] = checked
        if(e.isChecked){
          this.temp_Cat.push(id)
          // console.log(this.temp_Cat)
          // console.log(this.All_cat)
        }
      }
       if(e.isChecked == false){
        // console.log(false,e)
        // console.log(this.temp_Cat.indexOf(id))
        if(this.temp_Cat.indexOf(e.id) !=-1){

          this.temp_Cat.splice(this.temp_Cat.indexOf(e.id),1)
        }
      }
     
    })
   
    console.log(this.temp_Cat)
   

  }
}
