import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.scss']
})
export class AdminDashBoardComponent implements OnInit {
 activeMovies:number=0;
 blockedMovies:number=0;
 activeUser:number=0;
 blockedUser:number=0;
 genres:number=0;
 starcast:number=0;
 allMovie:number=0;
 allUser:number=0;
  constructor(private _apiService:AdminService,private route:Router) { }

  ngOnInit(): void {
    this._apiService.getAllMoviesLocal().subscribe({
      next:(data)=>{
        if (data != null) {
          this.activeMovies = data.filter(m=>m.Hidden===false).length;
          this.blockedMovies = data.filter(m=>m.Hidden===true).length;
         
          
          
        }
      }
    })
    this._apiService.getAllGenreLocal().subscribe({
      next:(data)=>{
        if(data!=null || data!=undefined){
         
          
          this.genres=data.length;
        }
      }
    })
    this._apiService.getBlockedUsersLocal().subscribe({
      next:(data)=>{
        if(data!=null || data!=undefined){
          this.blockedUser=data.length;
        }
      }
    })
    this._apiService.getAllUsersLocal().subscribe({
      next:(data)=>{
        if(data!=null || data!=undefined){
          this.activeUser=data.length;
        }
      }
    })
    this._apiService.getAllStarCastLocal().subscribe({
      next:(data)=>{
        if(data!=null || data!=undefined){
          this.starcast=data.length;
        }
      }
    })
   }
   movie(){
    this.route.navigate(['admin',{outlets:{adminoutlet:['movies']}}]);
   }
   user(){
    this.route.navigate(['admin',{outlets:{adminoutlet:['users']}}]);
   }
   genre(){
    this.route.navigate(['admin',{outlets:{adminoutlet:['genres']}}]);
   }
   cast(){
    this.route.navigate(['admin',{outlets:{adminoutlet:['starcasts']}}]);
   }
  
}
