import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  baseUrl = 'http://localhost:56128/api/';
  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  allMovies: Array<any> = [];
  allMoviesObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.allMovies);

  movieDetail: any = undefined;
  movieDetailObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.movieDetail);

  genresMovies: any= [];
  genresMoviesObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.genresMovies);

  watchLater: any = [];
  watchLaterObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.watchLater);

  allReviews: any = undefined;
  allReviewsObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.allReviews);

  reviewOfUser: any = [];
  reviewOfUserObs: BehaviorSubject<any> = new BehaviorSubject<any>(this.reviewOfUser);

  mainContentFlag:boolean = true;
  mainContentFlagObs:BehaviorSubject<any> = new BehaviorSubject(this.mainContentFlag); 
  
  searchContent:string = "";
  searchContentObs:BehaviorSubject<any> = new BehaviorSubject(this.searchContent); 

  profileUser:any=null;
  profileUserObs:BehaviorSubject<any> = new BehaviorSubject(this.profileUser);
 
  recommendedMovie:any=null;
  recommendedMovieObs:BehaviorSubject<any> = new BehaviorSubject(this.recommendedMovie);

  public getMovies(): Observable<any> {
    if (this.allMovies.length==0) {
      this.updateAllMoviesLocally();
    }
    return this.allMoviesObs.asObservable();
  }

  updateAllMoviesLocally() {
    this.getAllMovies().subscribe((data) => {
      
      if (data != undefined || data != null) {
        this.allMovies = data;
        this.allMoviesObs.next(this.allMovies);
      }
    });
  }
  
  getMovieById(movieId: number): Observable<any> {
    if (this.allMovies != undefined) {
      
      let movie = this.allMovies.find((movie) =>  movie.MovieId == movieId);
      
      if (movie != undefined) {
        this.movieDetail = movie;
        this.movieDetailObs.next(this.movieDetail);
      } else {
       
        this.updateMovieByIdLocally(movieId);
      }
    } else {
     
      this.updateMovieByIdLocally(movieId);
    }
    return this.movieDetailObs.asObservable();
  }
  updateMovieByIdLocally(movieId:number){
 
    this.getMovie(movieId).subscribe({
      next: (data) => {
        if (data != undefined || data != null) {
          
          this.movieDetail = data;
          this.movieDetailObs.next(this.movieDetail);
        }
      }
    });
  }

 
  getGenreMovies(genreName: string) {    
    
    if(this.genresMovies.find((item)=>item.name==genreName)==undefined){  
      this.genresMovies.push({ name: genreName, data: [] });
      this.updateGenreMoviesLocally(genreName);
    }
    return this.genresMoviesObs.asObservable();
  }

  updateGenreMoviesLocally(genreName:string){    
    
    this.getMovieByGenre(genreName).subscribe({
      next: (data) => {
        if (data != undefined) {
           this.genresMovies.forEach(genre => { 
            if(genre.name.toLowerCase()==genreName.toLowerCase()){
               genre.data=data;
            }
          });
          
          
          this.genresMoviesObs.next(this.genresMovies);
        }
      },
    });
    
  }


  public getReviewsOfUser(): Observable<any> {
    if (this.reviewOfUser.length==0) {
      this.updateReviewsOfUserLocally();
    }
    return this.reviewOfUserObs.asObservable();
  }

  updateReviewsOfUserLocally(){
    this.getReviewsOfUserById().subscribe((data) => {
      
      if (data != undefined || data != null) {
        this.reviewOfUser = data;
        this.reviewOfUserObs.next(this.reviewOfUser);
      }
    });
  }

  addToList(movieId:number,movieDetails:any){
   
    this.addToListByMovieId(movieId).subscribe({
      next:()=>{
        
       this.updateAllMoviesLocally();
        movieDetails.Genres.forEach(genre => {
          
          this.updateGenreMoviesLocally(genre.GenreName);

         
        });
        this.updateMovieByIdLocally(movieId);
        this.updateRecommended();
        
      }
    })
   
  }

  removeFromList(movieId:number,movieDetails:any){
   
    this.removeFromListByMovieId(movieId).subscribe({
      next:()=>{
        this.updateAllMoviesLocally();
        movieDetails.Genres.forEach(genre => {
          
          this.updateGenreMoviesLocally(genre.GenreName);
        });
       this.updateMovieByIdLocally(movieId);
       this.updateRecommended();
      }
      
    })
    
  }

  public getAllMovies(): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl + 'user/movies',{
      headers: headers_object
    });
  }
  public getMovie(movieId: number): Observable<any> {
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl + 'movie/movie?id=' + movieId,{
      headers: headers_object
    });
  }
  public getReviews(movieId: number): Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl + "movie/review?id=" + movieId,{
      headers: headers_object
    });
  }

  public getMovieByGenre(genreName:string):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());

    return this.http.get(this.baseUrl+'movie/movie?genrename='+genreName,{
      headers: headers_object
    });
  }

  public getWatchLaterMoviesByUserId(id:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    
        return this.http.get(this.baseUrl + 'user/watchlater',{
          headers:headers_object
        });
  }
  public getReviewsOfUserById():Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl + 'user/review',{
      headers:headers_object
    });
  }


  getMainContentFlag():Observable<any>{
    return this.mainContentFlagObs.asObservable();
  }

  getSearchContent():Observable<any>{
    return this.searchContentObs.asObservable();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeFromListByMovieId(movieId:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());

    return this.http.delete(this.baseUrl +'user/watchlater?movieId='+ movieId,{
      headers:headers_object
    })
  }
  addToListByMovieId(movieId:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());

    return this.http.post(this.baseUrl +'user/watchlater?movieId='+ movieId,{},{
      headers:headers_object
    });
  }

  addToHistory(movieId:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());

    return this.http.post(this.baseUrl +'user/history?movieid='+ movieId,{},{
      headers:headers_object
    });
  }
  deleteHistory(movieId:number):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.delete(this.baseUrl +'user/history?movieid='+ movieId,{
      headers:headers_object
    });
  }
  addReview(movieId:number,data:any):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.post(this.baseUrl +'user/review',{
      "MovieId":movieId,
      "Rating":data.ratingFormControl,
      "Review":data.reviewFormControl
    },{
      headers:headers_object
    });
  }
  public getProgileLocal(): Observable<any> {
    if (this.profileUser==null || this.profileUser==undefined) {
      this.updateProfileLocally();
    }
    return this.profileUserObs.asObservable();
  }
  updateProfileLocally() {
    this.getProfile().subscribe((data) => {
      
      if (data != undefined || data != null) {
        this.profileUser = data;
        this.profileUserObs.next(this.profileUser);
      }
    });
  }
  clearProfileLocally(){
    this.profileUserObs.next(null);
  }
  getProfile():Observable<any>{
  

    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl +'user/profile',{
      headers:headers_object
    });
  }
  EditProfileImage(data:FormData):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    
   
  
    return this.http.post(this.baseUrl +'user/editprofileimg',data, 
    {
      headers: headers_object
    });
  }
  editProfileDetails(name:string,number:string):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.put(this.baseUrl +'account/register',{Name:name,PhoneNumber:number}, 
    {
      headers: headers_object
    });
  }
  share(email:string,movietitle:string):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl +'user/share?email='+email+'&movietitle='+movietitle,
    {
      headers: headers_object
    });
  }

  getNotification():Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl +'user/notification',
    {
      headers: headers_object
    });

  }

  deleteNotification(movieId,senderId):Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.delete(this.baseUrl +'user/notification?senderid='+senderId+'&movieid='+movieId,
    {
      headers: headers_object
    });
  }
  public getRecommendedLocal(): Observable<any> {
    if (this.recommendedMovie==null || this.recommendedMovie==undefined) {
            this.updateRecommended();
       }
    return this.recommendedMovieObs.asObservable();
  }
  updateRecommended() {
    this.getRecommended().subscribe((data) => {
      
      if (data != undefined || data != null) {
        this.recommendedMovie = data;
        this.recommendedMovieObs.next(this.recommendedMovie);
      }
    });
  }
  getRecommended():Observable<any>{
    var   headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(this.baseUrl +'user/suggested',
    {
      headers: headers_object
    });
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
