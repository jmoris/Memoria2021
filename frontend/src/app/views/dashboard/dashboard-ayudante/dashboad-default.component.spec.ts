import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboadAyudanteComponent } from './dashboad-default.component';

describe('DashboadAyudanteComponent', () => {
  let component: DashboadAyudanteComponent;
  let fixture: ComponentFixture<DashboadAyudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboadAyudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboadAyudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
