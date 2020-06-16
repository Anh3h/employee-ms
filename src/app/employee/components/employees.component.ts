import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @Input()
  employees: Employee[];

  @Output()
  delete = new EventEmitter<String>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateEmployee(id: string) {
    this.router.navigate(['employees', id]);
  }

  deleteEmployee(id: string) {
    this.delete.emit(id);
  }

}
