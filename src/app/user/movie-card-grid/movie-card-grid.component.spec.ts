import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardGridComponent } from './movie-card-grid.component';

describe('MovieCardGridComponent', () => {
  let component: MovieCardGridComponent;
  let fixture: ComponentFixture<MovieCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
