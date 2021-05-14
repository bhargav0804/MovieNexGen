import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

@Input() movieDetails:any;

  constructor(private route: Router,private _apiService:APIService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  cardClick(){
  
  }

  addToList(event:Event){
    event.stopPropagation();
    this._apiService.addToList(this.movieDetails.MovieId,this.movieDetails)
    this.toastr.success ('Added Movie to My list');
  }
  removeFromList(event:Event){
    event.stopPropagation();

    this._apiService.removeFromList(this.movieDetails.MovieId,this.movieDetails)
    this.toastr.success ('Removed Movie from My list');
  }


}
