import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  baseUrl = 'http://localhost:56128/api/';

  constructor(private httpClient: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'account/register',
      userData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getUserByEmail(email:string):Observable<any>{
    
    return this.httpClient.get<any>(this.baseUrl+"account/checkemail?email="+email);
  }

  loginUser(userData:any):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + "account/login",userData);
  }
}
