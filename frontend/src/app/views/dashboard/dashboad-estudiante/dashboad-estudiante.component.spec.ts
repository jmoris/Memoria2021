import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboadEstudianteComponent } from './dashboad-estudiante.component';

describe('DashboadEstudianteComponent', () => {
  let component: DashboadEstudianteComponent;
  let fixture: ComponentFixture<DashboadEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboadEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboadEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
