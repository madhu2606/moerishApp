import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';


const routes: Routes = [
  {
    path:'',
    component:SplashComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'forget',
    component:ForgotpasswordComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
