import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-active-movies',
  templateUrl: './active-movies.component.html',
  styleUrls: ['./active-movies.component.scss']
})
export class ActiveMoviesComponent implements OnInit,AfterViewInit {
  Movies: any[] = [];


  constructor(private _apiService: AdminService, private route:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService) { }

  displayedColumns: string[] = ['id', 'title', 'releasedate', 'rating', 'duration', 'actionBtn'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this._apiService.getAllMoviesLocal().subscribe({
      next:(data)=>{
        if (data != null) {
          this.Movies = data.filter(m=>m.Hidden===false);
       
          
          this.dataSource.data=this.Movies;
        }
      }
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }

  blockMovie(movieId:number){
    this._apiService.blockMovie(movieId).subscribe(result=>{
      this._apiService.updateAllMoviesLocally();
      this.toastr.success("Movie Blocked...");
    })
  }


  editMovie(movieId:number){
    this.route.navigate(['editmovie',movieId],{relativeTo: this.activatedRoute});
  }
}
