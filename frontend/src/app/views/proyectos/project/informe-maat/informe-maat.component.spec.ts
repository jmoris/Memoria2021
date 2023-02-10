import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeMaatComponent } from './informe-maat.component';

describe('InformeMaatComponent', () => {
  let component: InformeMaatComponent;
  let fixture: ComponentFixture<InformeMaatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeMaatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeMaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
