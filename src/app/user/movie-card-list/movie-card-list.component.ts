import { analyzeAndValidateNgModules } from '@angular/compiler';
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/api.service';

declare var $: any;

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.scss'],
})
export class MovieCardListComponent implements OnInit,OnChanges {
  @Input() id: string;
  @Input('movieData') allMovies=[];



  
  columnlength: string = 'col-3';
  slides:any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSlide(event.target.innerWidth,this.allMovies);

  }
  setSlide(myWidth:number,cards:any){
    
    if (myWidth <= 576) {
      this.columnlength = 'col-12';
      this.slides = this.chunk(cards, 1);
    } else if (myWidth <= 768) {
      this.columnlength = 'col-6';
      this.slides = this.chunk(cards, 2);
    } else if (myWidth <= 1200) {
      this.columnlength = 'col-4';
      this.slides = this.chunk(cards, 3);
    } else {
      this.columnlength = 'col-3';
      this.slides = this.chunk(cards, 4);
    }
   
  }
  constructor(private apiService:APIService , private route:Router) {}
  ngOnInit() {
   
    this.setSlide(window.innerWidth,this.allMovies);

  }

  ngOnChanges(){
    
    this.setSlide(window.innerWidth,this.allMovies);
  }
  GoToGrid(){

    this.route.navigate(['user/movieGrid',this.id]);
  }
  
  getMyList(){

  }
  
}

//}
