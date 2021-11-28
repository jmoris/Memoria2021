import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitucionComponent } from './edit-institucion.component';

describe('EditInstitucionComponent', () => {
  let component: EditInstitucionComponent;
  let fixture: ComponentFixture<EditInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
