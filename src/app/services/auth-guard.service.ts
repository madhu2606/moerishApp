import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  helper = new JwtHelperService();
  token
  decoded

  constructor(
    private router: Router,
    ) { }
  canActivate(route,state:RouterStateSnapshot) {
    this.token = localStorage.getItem('token');
    this.decoded= this.helper.decodeToken(this.token);
    console.log(this.helper.isTokenExpired(this.token))
    if(this.helper.isTokenExpired(this.token) == false && this.decoded['data']['role'] == 'user') return true
    this.router.navigate(['/']);
    // ,{queryParams:{returnUrl :state.url}});
    return false;
  }
 
}
