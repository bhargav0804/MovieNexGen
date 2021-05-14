import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-block-form',
  templateUrl: './block-form.component.html',
  styleUrls: ['./block-form.component.scss']
})
export class BlockFormComponent implements OnInit {
  userForm = new FormGroup({
    days: new FormControl(''),
    message: new FormControl('')
  });

  emailForBlocking:string;
  constructor(public dialogref: MatDialogRef<BlockFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.emailForBlocking=data.email;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      days: new FormControl('', [
        Validators.required,

      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ])

    });
  }

  cancel(){
    this.dialogref.close();
  }
  confirm(){
    this.dialogref.close(this.userForm.value)

  }

  get days() { return this.userForm.get('days'); }

  get message() { return this.userForm.get('message'); }
}
