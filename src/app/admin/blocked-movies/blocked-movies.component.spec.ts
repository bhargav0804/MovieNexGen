import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedMoviesComponent } from './blocked-movies.component';

describe('BlockedMoviesComponent', () => {
  let component: BlockedMoviesComponent;
  let fixture: ComponentFixture<BlockedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
