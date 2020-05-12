import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesContainerComponent } from './employees-container.component';

describe('EmployeesContainerComponent', () => {
  let component: EmployeesContainerComponent;
  let fixture: ComponentFixture<EmployeesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
