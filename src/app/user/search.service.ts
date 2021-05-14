import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  mainContentFlag:boolean = true;
  mainContentFlagObs:BehaviorSubject<any> = new BehaviorSubject(this.mainContentFlag);
  constructor() {
   }

  getMainContentFlag():Observable<any>{
    return this.mainContentFlagObs.asObservable();
  }
}
