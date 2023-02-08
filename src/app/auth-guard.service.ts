import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
 
 
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthService, private router: Router){};
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):any{
      if (this.auth.isAuthenticated){
        return true
      } else {
        this.router.navigate(['/login']);
      }
    }
  }