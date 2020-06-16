import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { Employee, EmployeeDTO } from '../models/Employee';

describe('EmployeeService', () => {
  const employee = <Employee>{ id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 };
  const employeeDTO = <EmployeeDTO>{ id: 'ru2862s', employee_name: 'Samuel Johnson', employee_salary: 125000, employee_age: 56, profile_image: '' };
  let service: EmployeeService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ EmployeeService ]
    })

    service = TestBed.get(EmployeeService);
    mockHttp = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list employees', () => {
    const employees: Employee[] = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 }
    ];
    let employeeDTOs: EmployeeDTO[] = [
      { id: 'ru2862s', employee_name: 'Samuel Johnson', employee_salary: 125000, employee_age: 56, profile_image: '' },
      { id: 'iuy5688', employee_name: 'Jane Doe', employee_salary: 70000, employee_age: 25, profile_image: '' }
    ];

    service.getEmployees().subscribe(empls => {
      expect(empls.length).toEqual(employees.length);
      expect(empls).toEqual(employees);
    })

    const req = mockHttp.expectOne('http://0.0.0.0:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(employeeDTOs);
  });

  it('should fetch employee when provided an employee\'s id', () => {
    service.getEmployee('ru2862s').subscribe(empl => {
      expect(empl).toEqual(employee);
    })

    const req = mockHttp.expectOne('http://0.0.0.0:3000/employees/ru2862s');
    expect(req.request.method).toBe('GET');
    req.flush(employeeDTO);
  });

  it('should update employee and return updated employeee', () => {
    service.putEmployee(employee).subscribe(empl => {
      expect(empl).toEqual(employee);
    })

    const req = mockHttp.expectOne('http://0.0.0.0:3000/employees/ru2862s');
    expect(req.request.method).toBe('PUT');
    req.flush(employeeDTO);
  });

  it('should create employee and return created employeee', () => {
    service.postEmployee(employee).subscribe(empl => {
      expect(empl).toEqual(employee);
    })

    const req = mockHttp.expectOne('http://0.0.0.0:3000/employees');
    expect(req.request.method).toBe('POST');
    req.flush(employeeDTO);
  });

  it('should update employee and return updated employeee', () => {
    service.deleteEmployee('ru2862s').subscribe();

    const req = mockHttp.expectOne('http://0.0.0.0:3000/employees/ru2862s');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
