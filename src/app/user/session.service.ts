import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  getToken(){
    let token = localStorage.getItem('token');
    if(token!=null)
    {
      return token;
    }
    else{
      return undefined;
    }
  }

  setLocalSession(token:string,user:any){
    localStorage.setItem('token',token);
    localStorage.setItem('RoleName',user.RoleName);
    localStorage.setItem('UserProfile',user.Profile);
    localStorage.setItem('user',user);
    
  }
​
  checkSession():boolean{
    return localStorage.getItem('token')!=null;
  }
​
 
​
  clearSession(){
    localStorage.clear();
  }
}
