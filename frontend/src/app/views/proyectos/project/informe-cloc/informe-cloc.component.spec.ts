import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeClocComponent } from './informe-cloc.component';

describe('InformeClocComponent', () => {
  let component: InformeClocComponent;
  let fixture: ComponentFixture<InformeClocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeClocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeClocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
