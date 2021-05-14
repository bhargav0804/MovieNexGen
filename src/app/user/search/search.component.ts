import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movieData: Array<any> = [];
  searchContent:string = '';
  constructor(private _apiService:APIService) { }

  ngOnInit(): void {
    this._apiService.getMovies().subscribe({
      next: (result) => {                      
        this.movieData= result;
      },
    });
    this._apiService.getSearchContent().subscribe({
      next: (data)=>{
        this.searchContent = data;
      }
    });    
  }

}
