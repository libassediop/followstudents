import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteAbsenceComponent } from './alerte-absence.component';

describe('AlerteAbsenceComponent', () => {
  let component: AlerteAbsenceComponent;
  let fixture: ComponentFixture<AlerteAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteAbsenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
