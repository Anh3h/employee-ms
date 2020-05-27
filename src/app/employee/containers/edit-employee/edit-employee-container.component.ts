import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { of, Observable } from 'rxjs';

@Component({
  templateUrl: './edit-employee-container.component.html',
  styleUrls: ['./edit-employee-container.component.css']
})
export class EditEmployeeContainerComponent implements OnInit {

  employee$: Observable<Employee>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmployeeService
  ) { }

  ngOnInit() {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        this.id = +param.get('id');
        if(isNaN(this.id))
          return of(<Employee>{});
        return this.service.getEmployee(this.id);
      })
    );
  }

  saveEmployee(employee) {
    if(isNaN(this.id))
      return this.createEmployee(employee)
    return this.updateEmployee(employee);
  }

  updateEmployee(employee) {
    this.service.putEmployee(employee).subscribe(
      _ => this.router.navigate(['/employees'])
    );
  }

  createEmployee(employee) {
    this.service.postEmployee(employee).subscribe(
      _ => this.router.navigate(['/employees'])
    );
  }
}
