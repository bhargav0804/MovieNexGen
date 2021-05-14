import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../Services/admin.service';


@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss']
})
export class BlockedUsersComponent implements OnInit {
  Users: any[] = [];
  constructor(private _apiService :AdminService,private toastr:ToastrService ) { }
  displayedColumns: string[] = ['name', 'email', 'blockDate','blockMessage','blockBtn'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this._apiService.getBlockedUsersLocal().subscribe(result=>{
      if(result!=null)
      {
        this.Users = result;
        this.dataSource.data=this.Users;
      }
     })
    
  }

  unblockUser(userid,userEmail){
   this._apiService.unblockUser(userid).subscribe({
     next:()=>{
      this._apiService.updateUsersLocally();
      this.toastr.success("User unblocked..");
     }
   })
   
  }

}
