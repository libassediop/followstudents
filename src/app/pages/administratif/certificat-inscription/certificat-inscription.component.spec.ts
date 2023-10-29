import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatInscriptionComponent } from './certificat-inscription.component';

describe('CertificatInscriptionComponent', () => {
  let component: CertificatInscriptionComponent;
  let fixture: ComponentFixture<CertificatInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
