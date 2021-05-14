import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-star-cast-form',
  templateUrl: './star-cast-form.component.html',
  styleUrls: ['./star-cast-form.component.scss']
})
export class StarCastFormComponent implements OnInit {

  starCastForm= new FormGroup({
    starcastname:new FormControl('')
  })
  starCastNameForEdit:string;
  action:string;
  constructor(public dialogref:MatDialogRef<StarCastFormComponent> ,@Inject(MAT_DIALOG_DATA) public  data:any) { 
    this.starCastNameForEdit=data.starCastName;
    this.action=data.action;
    
  }
  
  ngOnInit(): void {
    this.starCastForm=new FormGroup({
      starcastname:new FormControl(this.starCastNameForEdit,[Validators.required])
    })
  }
  confirm(){
    this.dialogref.close(this.starCastForm.value)

  }
  cancel(){
    this.dialogref.close();
  }
  get starcastname() { return this.starCastForm.get('starcastname'); }

}
