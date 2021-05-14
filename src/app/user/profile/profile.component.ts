import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/api.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  windowWidth: number;
  username: string;
  userId: number;
  reviews: any = undefined;
  movieData: any = undefined;
  mainContentFlag:boolean;
  userProfile:any={};
  constructor(private _apiService: APIService,private toastr:ToastrService, public dialog: MatDialog) {}
  srcProfile:any;
  
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-Z ]*')
  ]);
  mobileFormControl =  new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern('[6-9]\\d{9}'),
  ]);
  ngOnInit(): void {
    
    this._apiService.getMainContentFlag().subscribe((data)=>{      
      if(data != null || data != undefined){        
        this.mainContentFlag = data;
      }
    });
    this._apiService.getProgileLocal().subscribe({
        next:(data)=>{
          if(data != null || data != undefined){  
            console.log("get Parofile");
            
            console.log(data);
            this.userProfile=data;
            this.nameFormControl.setValue(this.userProfile.Name);
            this.mobileFormControl.setValue(this.userProfile.PhoneNumber);
           
        }
      }
    })
    this.windowWidth = window.innerWidth;

    
    this._apiService.getReviewsOfUser().subscribe({
      next: (result) => {
        if (result != undefined) {
          this.reviews = result;
          console.log(this.reviews);
        }
      },
    });

    this._apiService.getMovies().subscribe({
      next:(data)=>{
        if (data != undefined) {

          this.movieData = data.filter(m=>m.HistoryBool == true);
          
        }
      }
    })


    // this.username = localStorage.getItem('user')['']
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }
  selectedFiles:any;
  currentFileUpload:any;
  uploadProfilePic(event){

    let formData = new FormData();
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);


    formData.append('file', this.currentFileUpload);

    formData.append('labelName', 'test');
    
    this._apiService.EditProfileImage(formData).subscribe({
      next:()=>{
        this.toastr.success("Profile photo updated..")
        this._apiService.updateProfileLocally();
      }
    })
   
  
  }
 
  deleteHistory(movieId:number){
    this._apiService.deleteHistory(movieId).subscribe({
      next:(data)=>{
        this.toastr.success ('Deleted from history');
        this._apiService.updateRecommended();
        this._apiService.updateAllMoviesLocally();
      }
    })
  }
  addReview(movieId:number,movieTitle:string){
    let genreFormDialog=this.dialog.open(ReviewDialogComponent,{data:{movieTitle:movieTitle},minHeight:300,minWidth:400});
    genreFormDialog.afterClosed().subscribe({
      next:(result)=>{
        if (result != undefined && result != null && result != ''){
          
          this.postReview(movieId,result);
        }
      }
    })
  }
  postReview(movieId:number,data:any){
    this._apiService.addReview(movieId,data).subscribe({
      next:(data)=>{
        this.toastr.success("Review added..")
        this._apiService.updateReviewsOfUserLocally()
      }
    });
  }
  editProfileDetails(){
    
    this._apiService.editProfileDetails(this.nameFormControl.value,this.mobileFormControl.value).subscribe({
      next:()=>{
        this.toastr.success("Profile details updated..")
        this._apiService.updateProfileLocally();
      }
    })
  }
}
