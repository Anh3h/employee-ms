import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { EmployeesContainerComponent } from './employees-container.component';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  selector: 'app-employees',
  template: ``
})
class MockEmployeesComponent {

  @Input()
  employees;

  @Output()
  delete = new EventEmitter<Employee>();

}

describe('EmployeesContainerComponent', () => {
  let component: EmployeesContainerComponent;
  let fixture: ComponentFixture<EmployeesContainerComponent>;
  let mockEmployeeService;
  let employeeService;
  let mockToastService;
  let toastService;

  beforeEach(async(() => {
    mockEmployeeService = jasmine.createSpyObj(['getEmployees', 'deleteEmployee']);
    mockToastService = jasmine.createSpyObj(['show']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [
        EmployeesContainerComponent,
        MockEmployeesComponent
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: ToastService, useValue: mockToastService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    employeeService = TestBed.get(EmployeeService);
    toastService = TestBed.get(ToastService);
    fixture = TestBed.createComponent(EmployeesContainerComponent);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployees.and.returnValue(of([
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 }
    ]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain employees gotten from the employee service', () => {
    mockEmployeeService.getEmployees.and.returnValue(of([
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 }
    ]));
    fixture.detectChanges();

    let employees: Employee[];
    component.employees$.subscribe( emplys => employees = emplys);
    expect(employees.length).toBe(2);
  });

  it('should call "deleteEmployee" method when app-employees emits a delete event', () => {
    spyOn(component, 'deleteEmployee');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('app-employees')).componentInstance.delete.emit();

    expect(component.deleteEmployee).toHaveBeenCalled();
  });

  it('should call "deleteEmployee" from employeeService when deleteEmployee method is called', () => {
    mockEmployeeService.deleteEmployee.and.returnValue(of({}));
    fixture.detectChanges();
    component.deleteEmployee('ru2862s');

    expect(employeeService.deleteEmployee).toHaveBeenCalled();
    expect(toastService.show).toHaveBeenCalled();
  });
});
