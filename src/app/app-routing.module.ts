import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrdertrackComponent } from './ordertrack/ordertrack.component';

import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { SplashComponent } from './splash/splash.component';
import { SupportComponent } from './support/support.component';



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
    component:DashboardComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'setting',
    component:SettingsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'order',
    component:MyordersComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'ordertrack',
    component:OrdertrackComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'support',
    component:SupportComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'changepass',
    component:ChangepasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
