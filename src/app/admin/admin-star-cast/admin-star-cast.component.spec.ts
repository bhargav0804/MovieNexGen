import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarCastComponent } from './admin-star-cast.component';

describe('AdminStarCastComponent', () => {
  let component: AdminStarCastComponent;
  let fixture: ComponentFixture<AdminStarCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStarCastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
