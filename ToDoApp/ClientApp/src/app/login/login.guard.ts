import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }
  canActivate(rouete: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let logged = this.apiService.isLoggedIn();
    console.log(logged)
    if (logged) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  
}
