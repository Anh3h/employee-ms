import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeesContainerComponent } from './employee/containers/employees-container.component';
import { EditEmployeeContainerComponent } from './employee/containers/edit-employee/edit-employee-container.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'employees', component: EmployeesContainerComponent },
  { path: 'employees/:id', component: EditEmployeeContainerComponent },
  { path: '*', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
