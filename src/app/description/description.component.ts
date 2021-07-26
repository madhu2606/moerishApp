import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemsService } from '../services/items.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
@Input() data
@Output() messageEvent = new EventEmitter();
@Output() addEvent = new EventEmitter();
itemList
ReviewList

  constructor(private location:Location,private item:ItemsService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getItems([this.data.cat_id])
    this.getRev(this.data.item_id)
  }

  getRev(id){
    this.item.getReviews(id).subscribe(res=>{
      // console.log('res')
      // console.log(res)
      if(res['success'] == true){

        this.ReviewList = res['data']
        this.ReviewList.forEach(e => {
          e.rating = parseInt(e.rating)
          
        });
      }
    })
  }
  counter(i: number) {
    return new Array(i);
}
 

  back() {
    this.messageEvent.emit()
  }
  addCart(id,add){
    let bdy = {
      id:id,
      add:add
    }
    this.addEvent.emit(bdy)

  }
  getItems(id){
    this.item.getItems(id).subscribe(res=>{
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
