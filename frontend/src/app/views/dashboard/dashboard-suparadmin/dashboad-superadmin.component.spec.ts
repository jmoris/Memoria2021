import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuperAdminComponent } from './dashboad-superadmin.component';

describe('DashboadDefaultComponent', () => {
  let component: DashboardSuperAdminComponent;
  let fixture: ComponentFixture<DashboardSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
