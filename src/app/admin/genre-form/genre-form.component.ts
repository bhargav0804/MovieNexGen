import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss']
})
export class GenreFormComponent implements OnInit {
  genreForm= new FormGroup({
    genrename:new FormControl('')
  })
  genreNameForEdit:string;
  action:string;
  constructor(public dialogref:MatDialogRef<GenreFormComponent> ,@Inject(MAT_DIALOG_DATA) public  data:any) { 
    this.genreNameForEdit=data.genreName;
    this.action=data.action;
    
  }
  
  ngOnInit(): void {
    this.genreForm=new FormGroup({
      genrename:new FormControl(this.genreNameForEdit,[Validators.required])
    })
  }
  confirm(){
    this.dialogref.close(this.genreForm.value)

  }
  cancel(){
    this.dialogref.close();
  }
  get genrename() { return this.genreForm.get('genrename'); }
}
