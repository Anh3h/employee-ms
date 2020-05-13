import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

import { tap } from 'rxjs/operators'

@Component({
  templateUrl: './employees-container.component.html',
  styleUrls: ['./employees-container.component.css']
})
export class EmployeesContainerComponent implements OnInit {

  employees;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

}
