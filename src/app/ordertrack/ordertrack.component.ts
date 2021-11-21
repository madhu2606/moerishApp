import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemsService } from '../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordertrack',
  templateUrl: './ordertrack.component.html',
  styleUrls: ['./ordertrack.component.css']
})
export class OrdertrackComponent implements OnInit {
order_no
orderdet = {
  address: "",
amount: '',
cancel_note: '',
created_date: '',
id: 2,
item: "",
order_no: "",
pay_mode: "cash",
status: "0",
user_id: "3"

}
canceltext
  constructor(private location: Location,private item:ItemsService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // console.log(params.value);
      this.order_no = params.id
      this.item.getOrderStatus(this.order_no).subscribe(res=>{
        console.log(res)
        this.orderdet = res['data'][0]
      })
    });
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  cancel(){

let bdy = {
  order_no:this.order_no,
  cancel_note:this.canceltext,
  status:'-1'
}
this.item.updateStatus(bdy).subscribe(res=>{
  console.log(res);
})
  }

  parseint(num){
    return parseInt(num)
  }
}
