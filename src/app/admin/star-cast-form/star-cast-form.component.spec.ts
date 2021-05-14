import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarCastFormComponent } from './star-cast-form.component';

describe('StarCastFormComponent', () => {
  let component: StarCastFormComponent;
  let fixture: ComponentFixture<StarCastFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarCastFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarCastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
