import { Component, HostListener, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.scss']
})
export class LeftAsideComponent implements OnInit {
  showFiller = true;
  constructor() { }

  ngOnInit(): void {
  
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth >= 768){
      $('#menu').show();
    }else{
    }
  }
  menuToggle(){
    $('#menu').slideToggle();
  }
   
 
}
