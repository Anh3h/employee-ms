import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeContainerComponent } from './edit-employee-container.component';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeContainerComponent;
  let fixture: ComponentFixture<EditEmployeeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployeeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
