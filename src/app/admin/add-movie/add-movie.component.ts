import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';

import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AdminService } from '../Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredGenres: Observable<string[]>;
  genres: string[] = [];
  allGenres: string[] = [];

  filteredStarcast: Observable<string[]>;
  starcasts: string[] = [];
  allStarcast: string[] = [];

  adminFormData:any = {};
  today = new Date();
  srcProfile:any;
  movieId:number;
  movie:any;
  action:string;
  thumbnailFlag:string="";
  
  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('starcastInput') starcastInput: ElementRef<HTMLInputElement>;

  addMovieForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    releaseDate: new FormControl(''),
    duration: new FormControl(''),
    plot: new FormControl(''),
    genreCtrl: new FormControl(''),
    starcastCtrl: new FormControl(''),
    thumbnail: new FormControl('')
  });

  get title() {
    return this.addMovieForm.get('title');
  }
  get releaseDate() {
    return this.addMovieForm.get('releaseDate');
  }
  get duration() {
    return this.addMovieForm.get('duration');
  }
  get plot() {
    return this.addMovieForm.get('plot');
  }
  get genreCtrl() {
    return this.addMovieForm.get('genreCtrl');
  }
  get starcastCtrl() {
    return this.addMovieForm.get('starcastCtrl');
  }
  get thumbnail() {
    return this.addMovieForm.get('thumbnail');
  }

  constructor(private _apiService: AdminService, private route:Router, private router:ActivatedRoute,private toastr:ToastrService) {
    this.movieId = Number(this.router.snapshot.paramMap.get('id'));
    if(this.movieId!=null || this.movieId!=0){
      _apiService.getAllMoviesLocal().subscribe(result=>{
        if(result!=null || result!=undefined){
          this.movie=result.find(m=>m.MovieId==this.movieId);
          
        }
      })
    }
    if(this.movie!=null || this.movie!=undefined){
      this.action="Edit Movie";

      this.srcProfile=this.movie.ThumbnailUrl;
      this.movie.Genres.forEach(g => 
        {
          this.genres.push(g.GenreName)
        });
        this.movie.StarCasts.forEach(g => 
          {
            this.starcasts.push(g.StarCastName)
          });
      
      this.addMovieForm = new FormGroup({
        title: new FormControl(this.movie.MovieTitle, [
          Validators.required,
        ]),
        releaseDate: new FormControl(this.movie.ReleaseDate, [
          Validators.required,
        ]),
        duration: new FormControl(this.movie.Duration, [
          Validators.required,
          Validators.min(5),
          Validators.max(500),
          Validators.pattern('[0-9]*')
        ]),
        plot: new FormControl(this.movie.Plot, [
          Validators.required,
          Validators.minLength(20)
        ]),
        genreCtrl: new FormControl('', [
        ]),
        starcastCtrl: new FormControl('',
          ),
        thumbnail: new FormControl('', 
        ),
      });
    }
    else{
      this.action="Add Movie"
      this.addMovieForm = new FormGroup({
        title: new FormControl('', [
          Validators.required,
        ]),
        releaseDate: new FormControl('', [
          Validators.required,
        ]),
        duration: new FormControl('', [
          Validators.required,
          Validators.min(5),
          Validators.max(500),
          Validators.pattern('[0-9]*')
        ]),
        plot: new FormControl('', [
          Validators.required,
          Validators.minLength(20)
        ]),
        genreCtrl: new FormControl('', [
        ]),
        starcastCtrl: new FormControl('',
          ),
        thumbnail: new FormControl('', 
        ),
      });
    }
    
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filterGenre(genre) : this.allGenres.slice()));
    this.filteredStarcast = this.starcastCtrl.valueChanges.pipe(
      startWith(null),
      map((starcast: string | null) => starcast ? this._filterStarcast(starcast) : this.allStarcast.slice()));
  }

  ngOnInit() {
    this._apiService.getAllGenreLocal().subscribe(result => {
      if (result != null) {
        this.allGenres = result.map(g => g.GenreName);

      }
    })
    this._apiService.getAllStarCastLocal().subscribe(result => {
      if (result != null) {
        this.allStarcast = result.map(s => s.StarCastName);

      }
    })
  }

  removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }
  removeStarcast(starcast: string): void {
    const index = this.starcasts.indexOf(starcast);

    if (index >= 0) {
      this.starcasts.splice(index, 1);
    }
  }

  selectedGenres(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }
  selectedStarcast(event: MatAutocompleteSelectedEvent): void {
    this.starcasts.push(event.option.viewValue);
    this.starcastInput.nativeElement.value = '';
    this.starcastCtrl.setValue(null);
  }
  private _filterGenre(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGenres.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterStarcast(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allStarcast.filter(starcast => starcast.toLowerCase().indexOf(filterValue) === 0);
  }

  formData = new FormData();  
 
  changeThumbnail(event:any){
    
    this.adminFormData['Thumbnail'] = event.target.files[0]
    this.formData.append('Thumbnail', event.target.files[0]);
    this.thumbnailFlag="changed";
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.srcProfile = event.target.result;
          
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}
  addMovie(event:Event) {

    
    var tempDate =  new Date(this.addMovieForm.get('releaseDate').value);
    var genres=this.genres.toString();
    var starcasts=this.starcasts.toString();
    
    this.formData.append('MovieTitle',  this.addMovieForm.get('title').value);  
    this.formData.append('Duration', this.addMovieForm.get('duration').value);  
    this.formData.append('ReleaseDate',(tempDate).toDateString());  
    this.formData.append('Plot',this.addMovieForm.get('plot').value);  
    this.formData.append('Genres', genres);  
    this.formData.append('StarCasts', starcasts);  
    this.formData.append('ThumbnailFlag',this.thumbnailFlag);
    if(this.movie!=null || this.movie!=undefined){
      this.formData.append('Id',this.movieId.toString());  
      this._apiService.updateMovie(this.formData).subscribe({
        next:(data)=>{
         
          this._apiService.updateAllMoviesLocally();
          this.toastr.success("Movie updated..")
        }
      });
    }
    else{
      this._apiService.addMovie(this.formData).subscribe({
        next:(data)=>{
          
          this._apiService.updateAllMoviesLocally();
          this.toastr.success("Movie added..")
        }
      });
    }
    
    this.route.navigate(['admin',{outlets:{adminoutlet:['movies']}}]);
  }
  cancel(){
    this.route.navigate(['admin',{outlets:{adminoutlet:['movies']}}]);
  }
}
