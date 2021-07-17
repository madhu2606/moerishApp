import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
 
    headerDict = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+localStorage.getItem('token')
  
    }
    
     requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict), 
    };
  constructor(public http:HttpClient) { }

  getItems(data){
   let body={
     "cat_id":data
   }
    return this.http.post(environment.url.getItems,body,this.requestOptions).map(
      res=>{
      // console.log(res)
      return res
      
    });
  }
  getCategories(){
   let body={
   
   }
    return this.http.post(environment.url.getCategories,body,this.requestOptions).map(
      res=>{
      console.log(res)
      return res
      
    });
  }
}
