import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  templateUrl: './employees-container.component.html',
  styleUrls: ['./employees-container.component.css']
})
export class EmployeesContainerComponent implements OnInit {

  employees$;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id)
      .subscribe(_ => this.router.navigate(['..']));
  }
}
