import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Employee, mapToModel, EmployeeDTO, mapToDTO } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly URL: string = 'http://0.0.0.0:3000/employees';
  readonly headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get(`${this.URL}`)
      .pipe(map((employeeDTOs: EmployeeDTO[]) => {
        return employeeDTOs.map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO));
      }));
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get(`${this.URL}/${id}`)
      .pipe(map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO)));
  }

  putEmployee(employee: Employee): Observable<any> {
    const employeeDTOStr: string = JSON.stringify( mapToDTO(employee) );

    return this.http.put(`${this.URL}/${employee.id}`, employeeDTOStr, this.headers)
      .pipe(map((employeeDTO: EmployeeDTO) => mapToModel(employeeDTO)));
  }
}