import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatAbsenceComponent } from './certificat-absence.component';

describe('CertificatAbsenceComponent', () => {
  let component: CertificatAbsenceComponent;
  let fixture: ComponentFixture<CertificatAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatAbsenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
