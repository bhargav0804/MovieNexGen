import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-banner-carousal',
  templateUrl: './banner-carousal.component.html',
  styleUrls: ['./banner-carousal.component.scss']
})
export class BannerCarousalComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    $('#carouselExampleControls').carousel({
      interval: 1500,
    });
  }

}
