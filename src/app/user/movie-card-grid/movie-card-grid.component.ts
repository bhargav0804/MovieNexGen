import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-movie-card-grid',
  templateUrl: './movie-card-grid.component.html',
  styleUrls: ['./movie-card-grid.component.scss'],
})
export class MovieCardGridComponent implements OnInit {
  type: string = '';
  userId:number;
  movieData: Array<any> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _apiService: APIService
  ) {
    activatedRoute.params.subscribe((data) => {
      this.type = data.type;
    });
  }

  cards: any;
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('UserId'));

    if (this.type == 'AllMovies') {
      this._apiService.getMovies().subscribe({
        next: (result) => {
          this.movieData= result;
        },
      });
    }else if(this.type == 'MyList'){
      this._apiService.getMovies().subscribe({
        next:(result)=>{
          this.movieData = result.filter(m=>m.WatchLaterBool == true);
        }
      })
    }else if(this.type == 'Recommended'){
      this._apiService.getRecommendedLocal().subscribe({
        next:(result)=>{
          this.movieData = result;
        }
      })
    }  else {
      this._apiService.getGenreMovies(this.type).subscribe({
        next: (result) => {
          let movies = result.find((item) => item.name == this.type);
          if (movies != undefined) {
            this.movieData = movies.data;
          }
        }
      });
    }
  }
}
