import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role:string= '';
  constructor(private _apiService:APIService,private route:Router) { }

  ngOnInit(): void {
    this._apiService.getProgileLocal().subscribe({
      next:(data)=>{
        if(data != null){

          this.role = data.RoleName;
        }
      }
    })
  }
  logout(){
    localStorage.clear();
    this.role = '';
    this._apiService.clearProfileLocally();
    this.route.navigate(['login'])
  }
}
