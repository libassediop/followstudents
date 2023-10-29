import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseJournalireComponent } from './caisse-journalire.component';

describe('CaisseJournalireComponent', () => {
  let component: CaisseJournalireComponent;
  let fixture: ComponentFixture<CaisseJournalireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseJournalireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisseJournalireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
