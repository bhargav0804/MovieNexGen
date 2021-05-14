import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../Services/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  
  
  constructor(private ApiService :AdminService ) { }


  ngOnInit(): void {
  
  }


}
