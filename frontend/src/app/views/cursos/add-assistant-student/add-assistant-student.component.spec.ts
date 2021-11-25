import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistantStudentComponent } from './add-assistant-student.component';

describe('AddAssistantStudentComponent', () => {
  let component: AddAssistantStudentComponent;
  let fixture: ComponentFixture<AddAssistantStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssistantStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssistantStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
