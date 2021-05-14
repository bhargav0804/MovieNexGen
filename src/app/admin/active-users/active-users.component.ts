import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockFormComponent } from '../block-form/block-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit,AfterViewInit {
  Users: any[] = [];


  constructor(private _apiService: AdminService, public dialog: MatDialog,private toastr:ToastrService) { }

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'gender', 'dateOfBirth', 'blockBtn'];
  dataSource = new MatTableDataSource([]);
  emailForBlocking: string;
  idForBlocking: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  blockUser(data) {


    this._apiService.blockUser(this.idForBlocking, data.days, data.message).subscribe(result => {
      this._apiService.updateUsersLocally();
      this.toastr.success("User blocked..");
    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {

    this._apiService.getAllUsersLocal().subscribe(result => {
      if (result != null) {
        this.Users = result;
        this.dataSource.data=this.Users;
        this.dataSource.paginator=this.paginator;
      }
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
    
  }



  getBlockingUser(userId, email) {
    this.emailForBlocking = email;
    this.idForBlocking = userId;
    let blockformdialog = this.dialog.open(BlockFormComponent, { data: { email: this.emailForBlocking } })

    blockformdialog.afterClosed().subscribe({
      next: (result) => {
        if (result != undefined && result != null && result != '') {
          this.blockUser(result)

        }
      }
    })
  }

}
