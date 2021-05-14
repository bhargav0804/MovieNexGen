import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/api.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit,OnDestroy {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  movieDetails:any;
  reviews:any = undefined;
  windowWidth:number;
  mainContentFlag:boolean;
id:any
  movieObs:Subscription;
  constructor(private _apiService:APIService,private activatedRoute:ActivatedRoute,private route:Router,private toastr:ToastrService) { }
   
  
  ngOnInit(): void {
   
    
    this._apiService.searchContentObs.next('');
    this._apiService.mainContentFlagObs.next(true);
    
    this._apiService.getMainContentFlag().subscribe((data)=>{    
      if(data != null || data != undefined){        
        this.mainContentFlag = data;
      }
    })
    this.windowWidth=window.innerWidth;
    this.movieDetails = {Genres:'' };
    
        this.movieObs=this._apiService.getMovieById(this.activatedRoute.snapshot.params.id).subscribe({
          next:(result)=>{
            if(result!=undefined)
            {
              this.movieDetails=result;
             
              
            }
          }
        });

  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth=event.target.innerWidth;
  }
  ngOnDestroy(){
    this.movieObs.unsubscribe();
  }

  tabClick(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if(tab == 'Reviews'){
      if(this.reviews==undefined){
        this._apiService.getReviews(this.activatedRoute.snapshot.params.id).subscribe({
          next:(result)=>{
            if(result!=undefined)
            {
              this.reviews=result;
              
            }
          }
        })
      }
      
    }
  }

  addToList(event:Event){
    event.stopPropagation();
    this._apiService.addToList(this.movieDetails.MovieId,this.movieDetails)
    this.toastr.success ('Added Movie to the list');
    
  }

  removeFromList(event:Event){
    event.stopPropagation();

    this._apiService.removeFromList(this.movieDetails.MovieId,this.movieDetails)
    this.toastr.success ('Removed Movie to the list');

  }

  shareBtnClk(event:any){
    this._apiService.share(this.emailFormControl.value,this.movieDetails.MovieTitle).subscribe({
      next:()=>{
        this.toastr.success ('Movie Shared..');
        $("#shareModal .close").click()
      }
    })
  }
  addToHistory(event:Event){
     this._apiService.addToHistory(this.movieDetails.MovieId).subscribe({
       next:(data)=>{
        this.toastr.success ('Movie added to history');
        this._apiService.updateAllMoviesLocally();
      
        this._apiService.updateRecommended();
       }
     }
     )
  }
}
