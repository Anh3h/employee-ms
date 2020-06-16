import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ToastService } from 'src/app/utils/services/toast.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';

@Component({
  templateUrl: './employees-container.component.html',
  styleUrls: ['./employees-container.component.css']
})
export class EmployeesContainerComponent implements OnInit {

  employees$: Observable<Employee[]>;

  constructor(
    private employeeService: EmployeeService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id)
      .subscribe(_ => {
        this.toastService.show("Successfully deleted employee.");
        this.router.navigate(['..']);
      });
  }
}
