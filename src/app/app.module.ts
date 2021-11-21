import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { DescriptionComponent } from './description/description.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SettingsComponent } from './settings/settings.component';

import { OrdertrackComponent } from './ordertrack/ordertrack.component';
import { MyordersComponent } from './myorders/myorders.component';
import { SupportComponent } from './support/support.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SplashComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    FooterComponent,
    CartComponent,
    ProfileComponent,
    DescriptionComponent,
    CheckoutComponent,
    SettingsComponent,
   
    OrdertrackComponent,
    MyordersComponent,
    SupportComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
