import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @Input()
  employees: any[];

  constructor() { }

  ngOnInit() {
  }

}
