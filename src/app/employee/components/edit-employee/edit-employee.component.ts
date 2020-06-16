import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  _employee: Employee;
  readonly minAge = 1;
  readonly minSalary = 10;

  @Input()
  set employee(value: Employee) {
    this.employeeForm.controls['name'].setValue(value? value['name']: {});
    this.employeeForm.controls['salary'].setValue(value? value['salary']: {});
    this.employeeForm.controls['age'].setValue(value? value['age']: {});
    this._employee = value;
  }

  @Output()
  onSaveEmployee = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(this.minSalary)]),
    age: new FormControl(0, [Validators.required, Validators.min(this.minAge)])
  });

  constructor() { }

  ngOnInit() {}

  saveForm() {
    if(this.employeeForm.valid) {
      let updatedForm = { ...this._employee, ...this.employeeForm.value };
      this.onSaveEmployee.emit(updatedForm);
    }
  }

}
