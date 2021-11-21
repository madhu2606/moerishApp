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
    headerDict1 = {
      'Content-Type': 'application/x-www-form-urlencoded',
     
  
    }
    requestOptions1 = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict1), 
    };
    
     requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict), 
    };
  constructor(public http:HttpClient) { }

  getItems(data,search){
   let body={
     "cat_id":data,
     "search":search
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
  getReviews(id){
   let body={
    item_id : id
   }
    return this.http.post(environment.url.getReviews,body,this.requestOptions).map(
      res=>{
      console.log(res)
      return res
      
    });
  }
  AddReviews(body){
    
     return this.http.post(environment.url.addReviews,body,this.requestOptions).map(
       res=>{
       console.log(res)
       return res
       
     });
   }
  addTocart(id,item){
    let body={
     user_id : id,
     item:JSON.stringify(item)
    }
     return this.http.post(environment.url.addtocart,body,this.requestOptions).map(
       res=>{
       console.log(res)
       return res
       
     });
   }
   getCart(id){
    let body={
     user_id : id
    }
     return this.http.post(environment.url.getCart,body,this.requestOptions).map(
       res=>{
       console.log(res)
       return res
       
     });
   }

   addOrder(body){
   
     return this.http.post(environment.url.addOrder,body,this.requestOptions).map(
       res=>{
       console.log(res)
       return res
       
     });
   }
   getOrder(id){
     let body = {
       user_id:id
     }
   
    return this.http.post(environment.url.getOrder,body,this.requestOptions).map(
      res=>{
      console.log(res)
      return res
      
    });
  }

  getOrderStatus(id){
    let body = {
      order_no:id
    }
  
   return this.http.post(environment.url.getOrderStatus,body,this.requestOptions).map(
     res=>{
     console.log(res)
     return res
     
   });
 }

 updateStatus(body){
 

 return this.http.post(environment.url.UpdateStatus,body,this.requestOptions).map(
   res=>{
   console.log(res)
   return res
   
 });
}
getAddress(body){
 

  return this.http.post(environment.url.getAddress,body,this.requestOptions).map(
    res=>{
    // console.log(res)
    return res
    
  });
 }

 saveAddress(body){
 

  return this.http.post(environment.url.saveAddress,body,this.requestOptions).map(
    res=>{
    // console.log(res)
    return res
    
  });
 }

 getPincodes(){
  let formData = new FormData();

  // append your data
  formData.append('username', environment.url.pinusername);
  formData.append('password', environment.url.pinpassowrd);
  
  return this.http.post(environment.url.getPincode,formData,this.requestOptions1).map(
    res=>{
    // console.log(res)
    return res
    
  });
 }
 getPin(){
  return this.http.post(environment.url.getPin,this.requestOptions).map(
    res=>{
    // console.log(res)
    return res
    
  });
 }
 
}
