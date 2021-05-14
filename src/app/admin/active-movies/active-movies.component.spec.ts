import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMoviesComponent } from './active-movies.component';

describe('ActiveMoviesComponent', () => {
  let component: ActiveMoviesComponent;
  let fixture: ComponentFixture<ActiveMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
