import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteNoteComponent } from './alerte-note.component';

describe('AlerteNoteComponent', () => {
  let component: AlerteNoteComponent;
  let fixture: ComponentFixture<AlerteNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
