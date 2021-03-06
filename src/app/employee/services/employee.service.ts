import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee, mapToModel, EmployeeDTO, mapToDTO } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  nextID: number = 30;
  readonly URL: string = 'http://0.0.0.0:3000/employees';
  readonly headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get(`${this.URL}`)
      .pipe(
        map((employeeDTOs: EmployeeDTO[]) => {
          return employeeDTOs.map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO));
        })
      );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get(`${this.URL}/${id}`)
      .pipe(
        map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO)));
  }

  putEmployee(employee: Employee): Observable<Employee> {
    const employeeDTOStr: string = JSON.stringify( mapToDTO(employee) );

    return this.http.put(`${this.URL}/${employee.id}`, employeeDTOStr, this.headers)
      .pipe(map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO)));
  }

  postEmployee(employee: Employee): Observable<Employee> {
    const employeeDTOStr: string = JSON.stringify( mapToDTO(employee) );

    return this.http.post(`${this.URL}`, employeeDTOStr, this.headers)
      .pipe(map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO)));
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(`${this.URL}/${employeeId}`, this.headers);
  }
}