import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistantTeacherComponent } from './add-assistant-teacher.component';

describe('AddAssistantTeacherComponent', () => {
  let component: AddAssistantTeacherComponent;
  let fixture: ComponentFixture<AddAssistantTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssistantTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssistantTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
