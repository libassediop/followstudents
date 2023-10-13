import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviPaiementComponent } from './suivi-paiement.component';

describe('SuiviPaiementComponent', () => {
  let component: SuiviPaiementComponent;
  let fixture: ComponentFixture<SuiviPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
