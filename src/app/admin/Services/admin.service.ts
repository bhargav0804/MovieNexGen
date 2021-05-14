import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'http://localhost:56128/api';


  allUsers: Array<any>;
  allUsersObs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  blockedUsers: Array<any>;
  blockedUsersObs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  allGenre: Array<any>;
  allGenreObs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  allStarCast: Array<any>;
  allStarCastObs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  allMovies: Array<any>;
  allMoviesobs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  activeMovies: Array<any>;
  activeMoviesobs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  blockedMovies: Array<any>;
  blockedMoviesobs: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
  getToken(){
    return localStorage.getItem('token');
  }
  
  

  

  public getAllMoviesLocal(): Observable<any> {
    if (this.allMovies == undefined) {
      this.updateAllMoviesLocally();
    }
    return this.allMoviesobs.asObservable();
  }

 public  updateAllMoviesLocally() {
    this.getAllMovies().subscribe({
      next: (data) => {
        if (data != undefined || data != null) {

          
          this.allMovies = data;
          this.allMoviesobs.next(this.allMovies);
        }
      }
    })
  }

  public getAllMovies(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/admin/movies',{
      headers:headers_object
    });
  }
  public getAllUsersLocal(): Observable<any> {
    if (this.allUsers == undefined) {
      this.updateUsersLocally();
    }
    return this.allUsersObs.asObservable();
  }

  public getBlockedUsersLocal(): Observable<any> {
    if (this.blockedUsers == undefined) {
      this.updateUsersLocally();
    }
    return this.blockedUsersObs.asObservable();
  }

  public updateUsersLocally() {

    this.getAllUsers().subscribe({
      next: (data) => {
        if (data != undefined || data != null) {
          this.allUsers = data;
          this.allUsersObs.next(this.allUsers);
        }
      }
    });

    this.getBlockedUsers().subscribe({
      next: data => {
        if (data != undefined || data != null) {
          this.blockedUsers = data;
          this.blockedUsersObs.next(this.blockedUsers);
        }
      }
    })
  }


  public getAllUsers(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/admin/users',{
      headers:headers_object
    });
  }
  public blockUser(userid, days, message): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.post(this.url + '/admin/block', {
      "userid": userid,
      "days": days,
      "message": message.toLowerCase()
    },{
      headers:headers_object
    })
  }
  public getBlockedUsers(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/admin/blockedusers',{
      headers:headers_object
    });
  }
  public unblockUser(userid: number): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/admin/unblock?userid=' + userid,{
      headers:headers_object
    });
  }
  public getAllGenreLocal(): Observable<any> {
    if (this.allGenre == undefined) {
      this.updateGenreLocally();
    }
    return this.allGenreObs.asObservable();
  }
  public updateGenreLocally() {
    this.getAllGenre().subscribe({
      next: (data) => {
        if (data != undefined || data != null) {
          this.allGenre = data;
          this.allGenreObs.next(this.allGenre);
        }
      }
    });
  }
  public getAllGenre(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/movie/genre',{
      headers:headers_object
    });
  }
  public postGenre(genreName: string): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.post(this.url + '/admin/genre', {
      "genrename": genreName.toLowerCase()
    },{
      headers:headers_object
    })
  }
  public putGenre(genreId: number, genreName: string): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.put(this.url + '/admin/genre', {
      "genreid": genreId,
      "genrename": genreName.toLowerCase()
    },{
      headers:headers_object
    })
  }
  public deleteGenre(genreId: number): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.delete(this.url + '/admin/genre?genreid=' + genreId,{
      headers:headers_object
    });
  }

  public getAllStarCastLocal(): Observable<any> {
    if (this.allStarCast == undefined) {
      this.updateStarCastLocally();
    }
    return this.allStarCastObs.asObservable();
  }
  public updateStarCastLocally() {
    this.getAllStarCast().subscribe({
      next: (data) => {
        if (data != undefined || data != null) {
          this.allStarCast = data;
          this.allStarCastObs.next(this.allStarCast);
        }
      }
    });
  }
  public getAllStarCast(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.url + '/movie/starcast',{
      headers:headers_object
    });
  }
  public postStarCast(starCastName: string): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.post(this.url + '/admin/starcast', {
      "starcastname": starCastName.toLowerCase()
    },{
      headers:headers_object
    })
  }
  public putStarCast(starCastId: number, starCastName: string): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.put(this.url + '/admin/starcast', {
      "starcastid": starCastId,
      "starcastname": starCastName.toLowerCase()
    },{
      headers:headers_object
    })
  }
  public deleteStarCast(starCastId: number): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.delete(this.url + '/admin/starcast?starcastid=' + starCastId,{
      headers:headers_object
    });
  }

  public blockMovie(movieId:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.delete(this.url+'/admin/movie?movieid='+movieId,{
      headers:headers_object
    });
  }

  public addMovie(data: FormData):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());  
    return this.http.post(this.url + '/admin/movie',data,{
      headers:headers_object
    });
  }
  public updateMovie(data: FormData):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.put(this.url + '/admin/movie',data,{
      headers:headers_object
    });
  }

}
