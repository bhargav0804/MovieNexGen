import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  movieTitle:string;


  reviewForm=new FormGroup({
    ratingFormControl : new FormControl('', [
      Validators.required,
     
    ]),
    reviewFormControl :  new FormControl('', [
      Validators.required,
     
    ])

  })
  get ratingFormControl() { return this.reviewForm.get('ratingFormControl'); }

  get reviewFormControl() { return this.reviewForm.get('reviewFormControl'); }
  constructor(public dialogref: MatDialogRef<ReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.movieTitle=data.movieTitle;
  }

  ngOnInit(): void {
  }
  cancel(){
    this.dialogref.close();
  }
  confirm(){
    
    this.dialogref.close(this.reviewForm.value)

  }
}
