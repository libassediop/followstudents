import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMensualiteComponent } from './list-mensualite.component';

describe('ListMensualiteComponent', () => {
  let component: ListMensualiteComponent;
  let fixture: ComponentFixture<ListMensualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMensualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMensualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
