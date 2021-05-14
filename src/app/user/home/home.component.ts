import { Component, OnInit, Output } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { SearchService } from '../search.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  MyList: string = 'MyList';
  Trending: string = 'Trending';
  RecentlyAdded: string = 'RecentlyAdded';
  Action: string = 'Action';
  Recommended:string = 'Recommended';
  actionData: any;
  AllMovies: string = 'AllMovies';
  Comedy: string = 'Comedy';
  MyListData = [];
  RecommendedList = [];
  //  ActionData=[];
  //  ComedyData=[];
  AllMoviesData = [];
  genresMovies = [];
  userId:number;
  mainContentFlag:boolean;
  constructor(private _apiService: APIService) {}
  ngOnInit() {
    this._apiService.getMainContentFlag().subscribe((data)=>{
      
      if(data != null || data != undefined){        
        this.mainContentFlag = data;
      }
    })
    this.getGenreMovies('Action');
    this.getGenreMovies('Thriller');
    this.getGenreMovies('Historical');
    this.getGenreMovies('Comedy');
    this.getGenreMovies('Romance');

    this._apiService.getMovies().subscribe({
      next: (result) => {

        this.AllMoviesData = result;
      },
    });
    this._apiService.getRecommendedLocal().subscribe({
      next:(data)=>{
        
        if(data != null || data != undefined){        
          this.RecommendedList = data;
        }
       
      }
    })

    this._apiService.getMovies().subscribe({
      next:(result)=>{
        this.MyListData = result.filter(m=> m.WatchLaterBool == true);
      }
    })
  }

  

  getGenreMovies(genre: string) {
    this._apiService.getGenreMovies(genre).subscribe((data) => {
      this.genresMovies = this._apiService.shuffle(data) ;
      
    });
  }
}
