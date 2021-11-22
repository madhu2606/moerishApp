import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { LoginService } from '../services/login.service';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems 
  userDetails
  order_no = this.getUniqueId(3)
  sum = 0
  coords
  payCard = 'cash'
  addList = []
  isPin = false
  isLoad = false

  
    
  constructor(private location:Location, private login:LoginService,private item:ItemsService,private route:Router) { }
  async locate() {
    try{
    //  let c = await Geolocation.requestPermissions();
    //  console.log(c)
      const coordinates = await Geolocation.getCurrentPosition();
      this.coords = coordinates.coords;
      console.log(this.coords);
      let bdy = {
        "lat":this.coords.latitude,
        "lng":this.coords.longitude
      }
      this.item.getAddress(bdy).subscribe(res=>{
       let p = res.toString()
       let addr = JSON.parse(p)
       let strt = ''
       let llt = ''
       let pin =''
           console.log(addr['results'])
        addr['results'][0]["address_components"].forEach(e => {
         
          if(e.types.includes('street_number')){
           
            strt = strt + e['long_name']+', '
          }else if(e.types.includes("sublocality")){
            
            strt = strt + e['long_name']+', '
          }
          else if(e.types.includes("postal_code")){

          pin = e['long_name']
          }else{
            llt = llt + e['long_name'] + ', '
          }
        });
        this.addressForm.get('address').setValue(strt)
        this.addressForm.get('location').setValue(llt)
        this.addressForm.get('pin').setValue(pin)
        let adJson =
          {
            "fulladdress":strt + ' ' + llt + ' '+pin,
            "street":strt,
            "location":llt,
            "pin":pin,
            "lat":this.coords.latitude,
            "lng":this.coords.longitude,
            "userid":this.userDetails.id
        }
        let tpPIN = []
        if(this.addList.length >0){
          this.addList.forEach(e=>{
            tpPIN.push(e['pin'])
            
          });
          // console.log(!tpPIN.includes(pin))
          // console.log(tpPIN.includes(pin))

          if(!tpPIN.includes(pin)){
            this.item.saveAddress(adJson).subscribe(res=>{
              console.log(res)
            
            })
          }
        }else{
          this.item.saveAddress(adJson).subscribe(res=>{
            console.log(res)
          })
        }
      
        
        // console.log(strt)
        // console.log(llt)
        // console.log(pin)


      })
      
    }
    catch(e){
console.log(e);

alert('Please Enable location service');
 

    }
    
  }

  checkPin(pin){
  // this.pin.
  let d:any
    this.item.getPin().subscribe(res=>{
      // console.log(res)
      d = (res)
      d = JSON.parse(d)
      d.forEach(e=>{
        if(e['pincode'] == pin){
         console.log('true')
          this.isPin = true
          this.isLoad = false
        }
      })
    })
  }

  getAdress(){
   
    this.addList = this.userDetails.address !=null ? JSON.parse(this.userDetails.address):[]
    console.log(this.addList)
  }

  changAddr(i){
    console.log(i)
    this.addressForm.get('address').setValue(i.street)
    this.addressForm.get('location').setValue(i.location)
    this.addressForm.get('pin').setValue(i.pin)
  }

  ngOnInit(): void {
   
    
    this.userDetails = this.login.getUserDetails()
    this.cartItems = JSON.parse(localStorage.getItem('cart')) != null?JSON.parse(localStorage.getItem('cart')):[]
    this.getSum()
    this.getAdress()
    this.addressForm.get('pin').valueChanges.subscribe(res=>{
      // console.log('This is chnaged')
      // console.log(res)
      this.isLoad = true
      this.checkPin(res)
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
  back(){
    this.location.back();
  }
  getUniqueId(parts) {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('');
  }
  addressForm = new FormGroup({
    address: new FormControl(''),
    location: new FormControl(''),
    pin:new FormControl('')
  })

  onSubmit(){
    let ven = {}
    let fadd = this.addressForm.value.address + ' ' + this.addressForm.value.location + ' '+this.addressForm.value.pin 
    console.log(fadd)
    this.cartItems.forEach(e=>{
      // console.log(e['item']['vendor_id'])
      ven[e['item']['vendor_id']]=[]
    });
    this.cartItems.forEach(e=>{
    
      ven[e['item']['vendor_id']].push(e)
    });
    console.log(ven);

  


if(this.sum > 0 && this.addressForm.value.address != '' && this.isPin){
  if(this.payCard == 'cash' ){
    Object.keys(ven).forEach(e=>{
      console.log(ven[e])
      let body = {
        address:fadd,
        order_no:this.getUniqueId(3),
        pay_mode:this.payCard,
        user_id:this.userDetails.id,
        amount:this.sum,
        item:JSON.stringify(ven[e]),
        vendor_id:e
      
      }
      this.item.addOrder(body).subscribe(res=>{
        console.log(res)
        if(res['success']){
          // console.log(this.order_no)
        
         
        }else{
         
  
            console.log('something wrong')
        
        }
      })
      
      }
      )
        this.cartItems = []
          
        localStorage.removeItem('cart')
        this.item.addTocart(this.userDetails.id,this.cartItems).subscribe(res=>{
          this.route.navigateByUrl('/order')
          // track?id='+this.order_no
        })
  }else{

    console.log('Redirecting to payment page')
  }
}else{
  if(this.sum <= 0){
    alert('Please add items to cart')

  
  }
  else if(this.isPin !=true){

    alert('Please Choose different address as Pin code is not serviceable')
  }
  else{

    alert('Please fill the address')
  }
}



  }

}
