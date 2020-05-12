import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeesContainerComponent } from './employees/container/employees-container.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'employees', component: EmployeesContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
