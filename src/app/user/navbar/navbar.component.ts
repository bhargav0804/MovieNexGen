import { AnimationQueryMetadata } from '@angular/animations';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/api.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selected = 'option2';
  collapsed = true;
  windowWidth:number;
  searchContent:string = '';
  notifications:any = [];
  userProfile:any;
  movieDetailsFlag:string='no';
  
  constructor(private route: Router, private _apiService: APIService,private toastr:ToastrService) {
    
    if(route.url.includes('/user/movie-details'))
    {
      this.movieDetailsFlag='yes';
    }
    
    route.events.subscribe({
      next:(event)=>{
        if(event instanceof NavigationEnd)
        {
          if(event.url.includes('/user/movie-details'))
          {
            this.movieDetailsFlag='yes';
          }
        }
      }
    })

   }

  ngOnInit(): void {
    this.windowWidth=window.innerWidth;
    this._apiService.getProgileLocal().subscribe({
      next:(data)=>{
        if(data!=null || data==undefined)
        this.userProfile=data;
      }
    })
    this.getNotification();
    setInterval(()=>{
    this.getNotification();
    },10000);
  }
  GotoProfile(){
    this.route.navigate(['user/profile'])
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth=event.target.innerWidth;
  }
  logout(){
    localStorage.clear();
    this._apiService.clearProfileLocally();
    this.route.navigate(['login']);
  }

  Search(event:Event){   
    if(this.searchContent.length != 0){
      this._apiService.mainContentFlag = false;
      this._apiService.mainContentFlagObs.next(false);
      this._apiService.searchContent = this.searchContent;
      this._apiService.searchContentObs.next(this.searchContent);
    } else{    
      this._apiService.mainContentFlag = true;
      this._apiService.mainContentFlagObs.next(true);
    }
  }

  getNotification(){
    this._apiService.getNotification().subscribe({
      next:(data)=>{
        this.notifications = data;
      }
    })
  }
  deleteNotification(data:any){
    this._apiService.deleteNotification(data.MovieId,data.SenderId).subscribe({
      next:()=>{
        this.toastr.success("Notification deleted..");
        this._apiService.getNotification().subscribe({
          next:(data)=>{
            this.notifications=data;
          }
        })
      }
    });
  }
}

