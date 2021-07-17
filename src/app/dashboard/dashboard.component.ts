import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
cat_id  = []
category
itemList
userDetails
  constructor(
    private item:ItemsService,
    private login:LoginService
  ) { }

  ngOnInit(): void {
this.getAllCat()

    this.userDetails = this.login.getUserDetails();
    console.log(this.userDetails)
  
    
  }
  getItems(){
    this.item.getItems(this.cat_id).subscribe(res=>{
      console.log(res)
      if(res['success'] == true){

        this.itemList = res['data']
     
      }
    })
  }

  getAllCat(){
    this.item.getCategories().subscribe(res=>{
      console.log(res)
      if(res['success']){
        this.category = res['data'];
        this.category.forEach(e => {
          this.cat_id.push(e.id)
          
        });
        this.getItems()
      }
    })
  }

}
