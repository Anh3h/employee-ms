import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .pipe(map (result => result['data']));
  }
}
