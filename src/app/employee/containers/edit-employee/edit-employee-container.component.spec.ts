import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EditEmployeeContainerComponent } from './edit-employee-container.component';
import { EditEmployeeComponent } from '../../components/edit-employee/edit-employee.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from '../../services/employee.service';
import { ToastService } from 'src/app/utils/services/toast.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeContainerComponent;
  let fixture: ComponentFixture<EditEmployeeContainerComponent>;
  let mockEmployeeService;
  let mockToastService;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockEmployeeService = jasmine.createSpyObj(['getEmployee', 'putEmployee']);
    mockToastService = jasmine.createSpyObj(['show']);
    mockActivatedRoute = {
      paramMap: of(<ParamMap>{ get: (param) => { return 'rt56ru' }}),
      snapshot: {}
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        EditEmployeeContainerComponent,
        EditEmployeeComponent
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
    component = fixture.componentInstance;
    mockEmployeeService.getEmployee.and.returnValue(of({
      id: 'rt56ru',
      name: 'Chris Morrison',
      salary: 80000,
      age: 29
    }))

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
