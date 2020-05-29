import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { of, Observable } from 'rxjs';
import { ToastService } from 'src/app/utils/services/toast.service';

@Component({
  templateUrl: './edit-employee-container.component.html',
  styleUrls: ['./edit-employee-container.component.css']
})
export class EditEmployeeContainerComponent implements OnInit {

  employee$: Observable<Employee>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        this.id = param.get('id');
        if(this.id == 'new')
          return of(<Employee>{});
        return this.employeeService.getEmployee(this.id);
      })
    );
  }

  saveEmployee(employee) {
    if(this.id == 'new')
      return this.createEmployee(employee)
    return this.updateEmployee(employee);
  }

  updateEmployee(employee) {
    this.employeeService.putEmployee(employee).subscribe(
      () => {
        this.toastService.show("Successfully updated employee.")
        this.router.navigate(['/employees'])
      }
    );
  }

  createEmployee(employee) {
    this.employeeService.postEmployee(employee).subscribe(
      () => {
        this.toastService.show("Successfully created employee.")
        this.router.navigate(['/employees'])
      }
    );
  }
}
