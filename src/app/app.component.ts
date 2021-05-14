import { Component } from '@angular/core';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MovieNexGenV1';
  role:string='';
  constructor( private _apiService:APIService){
    
    
      this._apiService.getProgileLocal().subscribe((data)=>{
        if(data!=null)
          this.role= data.RoleName;
        else{
          this.role='';
        }
      });
  }
}
