import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let expectedRoles = route.data.expectedRoles;
      
    let token = localStorage.getItem('token');
  
    if(token != null){
      let user = localStorage.getItem('user');
      let roleName = localStorage.getItem('RoleName');
      if (user != null) {
        if (expectedRoles.includes(roleName)) {
          return true;
        } else if(roleName=='User') {
          this._router.navigate(['user']);
          return false;
        }
        else if(roleName=='Admin') {
          this._router.navigate(['admin']);
          return false;
        }
        else{
          return false;
        }
      } else {
        this._router.navigate(['login']);
        return false;
      }
    }
    else if(expectedRoles.includes('other')){
      
      return true;
    }
    else{
      
      this._router.navigate(['login']);
       return false;
    }
    
   
  }
}
