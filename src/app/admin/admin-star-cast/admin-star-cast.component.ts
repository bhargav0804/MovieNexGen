import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../Services/admin.service';
import { StarCastFormComponent } from '../star-cast-form/star-cast-form.component';

@Component({
  selector: 'app-admin-star-cast',
  templateUrl: './admin-star-cast.component.html',
  styleUrls: ['./admin-star-cast.component.scss']
})
export class AdminStarCastComponent implements OnInit ,AfterViewInit {

  starcast:any[]=[];
  starCastIdForEdit:number;
  constructor(private _apiService: AdminService, public dialog: MatDialog,private toastr:ToastrService) { }
  displayedColumns: string[] = ['id', 'starcastname', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this._apiService.getAllStarCastLocal().subscribe(result => {
      if (result != null) {
        this.starcast = result;
        this.dataSource.data = this.starcast;
      }
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  postStarCast(data){
   this._apiService.postStarCast(data.starcastname).subscribe(result=>{
     this._apiService.updateStarCastLocally();
     this.toastr.success("Starcast added..");
   })
  }
  addStarCast(starCastNameForEdit:string){
    let staCastFormDialog=this.dialog.open(StarCastFormComponent,{data:{starCastName:starCastNameForEdit ,action:"Add"},minHeight:200,minWidth:300});
    staCastFormDialog.afterClosed().subscribe({
      next:(result)=>{
        if (result != undefined && result != null && result != ''){
          this.postStarCast(result);
        }
      }
    })
  }
  putStarCast(data){
    this._apiService.putStarCast(this.starCastIdForEdit,data.starcastname).subscribe(result=>{
      this._apiService.updateStarCastLocally();
      this.toastr.success("Starcast updated..");
    })
  }
  editStarCast(starCastId:number,starCastNameForEdit:string){
    this.starCastIdForEdit=starCastId;
    let staCastFormDialog=this.dialog.open(StarCastFormComponent,{data:{starCastName:starCastNameForEdit ,action:"Update"},minHeight:200,minWidth:300});
    staCastFormDialog.afterClosed().subscribe({
      next:(result)=>{
        if (result != undefined && result != null && result != ''){
          this.putStarCast(result);
        }
      }
    })
  }
  deleteStarCast(starCastId:number){
    this._apiService.deleteStarCast(starCastId).subscribe(result=>{
      this._apiService.updateStarCastLocally();
      this.toastr.success("Starcast deleted..");
    })
  }

}
