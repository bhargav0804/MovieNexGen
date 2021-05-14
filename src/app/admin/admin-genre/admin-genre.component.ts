import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GenreFormComponent } from '../genre-form/genre-form.component';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.scss']
})
export class AdminGenreComponent implements OnInit,AfterViewInit   {
  genre:any[]=[];
  genreIdForEdit:number;
  constructor(private _apiService: AdminService, public dialog: MatDialog,private toastr:ToastrService) { }
  displayedColumns: string[] = ['id', 'genrename', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this._apiService.getAllGenreLocal().subscribe(result => {
      if (result != null) {
        this.genre = result;
        this.dataSource.data=this.genre;
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
  postGenre(data){
   this._apiService.postGenre(data.genrename).subscribe(result=>{
     this._apiService.updateGenreLocally();
     this.toastr.success("Genre added..");
   })
  }
  addGenre(genreNameForEdit:string){
    let genreFormDialog=this.dialog.open(GenreFormComponent,{data:{genreName:genreNameForEdit ,action:"Add"},minHeight:200,minWidth:300});
    genreFormDialog.afterClosed().subscribe({
      next:(result)=>{
        if (result != undefined && result != null && result != ''){
          this.postGenre(result);
        }
      }
    })
  }
  putGenre(data){
    this._apiService.putGenre(this.genreIdForEdit,data.genrename).subscribe(result=>{
      this._apiService.updateGenreLocally();
      this.toastr.success("Genre updated..");
    })
  }
  editGenre(genreId:number,genreNameForEdit:string){
    this.genreIdForEdit=genreId;
    let genreFormDialog=this.dialog.open(GenreFormComponent,{data:{genreName:genreNameForEdit ,action:"Update"},minHeight:200,minWidth:300});
    genreFormDialog.afterClosed().subscribe({
      next:(result)=>{
        if (result != undefined && result != null && result != ''){
          this.putGenre(result);
        }
      }
    })
  }
  deleteGenre(genreId:number){
    this._apiService.deleteGenre(genreId).subscribe(result=>{
      this._apiService.updateGenreLocally();
      this.toastr.success("Genre deleted..");
    })
  }
}
