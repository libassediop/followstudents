import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEleveParClasseComponent } from './liste-eleve-par-classe.component';

describe('ListeEleveParClasseComponent', () => {
  let component: ListeEleveParClasseComponent;
  let fixture: ComponentFixture<ListeEleveParClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEleveParClasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEleveParClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
