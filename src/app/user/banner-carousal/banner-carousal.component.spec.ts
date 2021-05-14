import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCarousalComponent } from './banner-carousal.component';

describe('BannerCarousalComponent', () => {
  let component: BannerCarousalComponent;
  let fixture: ComponentFixture<BannerCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCarousalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
