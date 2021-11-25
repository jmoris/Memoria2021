import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboadDocenteComponent } from './dashboad-default.component';

describe('DashboadDocenteComponent', () => {
  let component: DashboadDocenteComponent;
  let fixture: ComponentFixture<DashboadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
