import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseEnseignerComponent } from './classe-enseigner.component';

describe('ClasseEnseignerComponent', () => {
  let component: ClasseEnseignerComponent;
  let fixture: ComponentFixture<ClasseEnseignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseEnseignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseEnseignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
