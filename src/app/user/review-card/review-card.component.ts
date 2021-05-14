import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  list=[1,2];

  @Input() review:any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
