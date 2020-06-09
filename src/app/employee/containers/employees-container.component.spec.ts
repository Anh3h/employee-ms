import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesContainerComponent } from './employees-container.component';
import { EmployeesComponent } from '../components/employees.component';
import { ListPaginationComponent } from 'src/app/utils/components/list-pagination/list-pagination.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeesContainerComponent', () => {
  let component: EmployeesContainerComponent;
  let fixture: ComponentFixture<EmployeesContainerComponent>;
  let mockEmployeeService;

  beforeEach(async(() => {
    mockEmployeeService = jasmine.createSpyObj(['getEmployees']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [
        EmployeesContainerComponent,
        EmployeesComponent,
        ListPaginationComponent
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
