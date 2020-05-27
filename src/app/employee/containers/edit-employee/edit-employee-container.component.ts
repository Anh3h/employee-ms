import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';

@Component({
  templateUrl: './edit-employee-container.component.html',
  styleUrls: ['./edit-employee-container.component.css']
})
export class EditEmployeeContainerComponent implements OnInit {

  employee$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmployeeService
  ) { }

  ngOnInit() {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => this.service.getEmployee(param.get('id')))
    );
  }

  updateEmployee(data) {
    this.service.putEmployee(data).subscribe(
      _ => this.router.navigate(['/employees'])
    );
  }
}
