import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { EditEmployeeContainerComponent } from './edit-employee-container.component';
import { EmployeeService } from '../../services/employee.service';
import { ToastService } from 'src/app/utils/services/toast.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-edit-employee',
  template: ''
})
class MockEditEmployeeComponent {
  @Input()
  employee: Employee;

  @Output()
  onSaveEmployee = new EventEmitter<Employee>();
}

@Component({
  selector: 'app-employees',
  template: ''
})
class MockEmployeesComponent { }

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeContainerComponent;
  let fixture: ComponentFixture<EditEmployeeContainerComponent>;
  let mockEmployeeService;
  let mockToastService;
  let mockActivatedRoute;
  let employeeService;
  let toastService;
  const employee = {
    id: 'rt56ru',
    name: 'Chris Morrison',
    salary: 80000,
    age: 29
  };

  beforeEach(async(() => {
    mockEmployeeService = jasmine.createSpyObj(['getEmployee', 'putEmployee', 'postEmployee']);
    mockToastService = jasmine.createSpyObj(['show']);
    mockActivatedRoute = {
      paramMap: of(<ParamMap>{ get: (param) => { return 'rt56ru' }}),
      snapshot: {}
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'employees', component: MockEmployeesComponent}
        ])
      ],
      declarations: [
        EditEmployeeContainerComponent,
        MockEditEmployeeComponent,
        MockEmployeesComponent
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeContainerComponent);
    employeeService = TestBed.get(EmployeeService);
    toastService = TestBed.get(ToastService);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployee.and.returnValue(of(employee))
  });

  it('should create and employee should be initialized', () => {
    fixture.detectChanges();

    let compEmployee;
    expect(component).toBeTruthy();
    component.employee$.subscribe(empl => compEmployee = empl);
    expect(compEmployee).toEqual(employee);
  });

  it('should call saveEmployee when onSaveEmployee event is emitted', () => {
    mockEmployeeService.putEmployee.and.returnValue(of({}));
    spyOn(component, 'saveEmployee');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('app-edit-employee')).componentInstance.onSaveEmployee.emit(employee);

    expect(component.saveEmployee).toHaveBeenCalled();
  });

  it('should call updateEmployee when saveEmployee is called with id set to an employee\'s id', () => {
    mockEmployeeService.putEmployee.and.returnValue(of({}));
    component.id = employee.id;
    spyOn(component, 'updateEmployee');
    fixture.detectChanges();
    component.saveEmployee(employee);

    expect(component.updateEmployee).toHaveBeenCalled();
  });

  it('should call employeeService.updateEmployee when updateEmployee is called', () => {
    mockEmployeeService.putEmployee.and.returnValue(of({}));
    fixture.detectChanges();
    component.updateEmployee(employee);

    expect(employeeService.putEmployee).toHaveBeenCalled();
  });

  it('should call createEmployee when saveEmployee is called with id set to new', () => {
    mockEmployeeService.putEmployee.and.returnValue(of({}));
    fixture.detectChanges();
    component.id = 'new';
    spyOn(component, 'createEmployee');
    fixture.detectChanges();
    component.saveEmployee(employee);

    expect(component.createEmployee).toHaveBeenCalled();
  });

  it('should call employeeService.postEmployee when updateEmployee is called', () => {
    mockEmployeeService.postEmployee.and.returnValue(of({}));
    fixture.detectChanges();
    component.createEmployee(employee);

    expect(employeeService.postEmployee).toHaveBeenCalled();
    expect(toastService.show).toHaveBeenCalled();
  })
});
