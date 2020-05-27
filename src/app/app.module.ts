import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { EmployeesContainerComponent } from './employee/containers/employees-container.component';
import { EmployeesComponent } from './employee/components/employees.component';
import { ListPaginationComponent } from './utils/list-pagination/list-pagination.component';
import { EditEmployeeComponent } from './employee/components/edit-employee/edit-employee.component';
import { EditEmployeeContainerComponent } from './employee/containers/edit-employee/edit-employee-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    EmployeesContainerComponent,
    EmployeesComponent,
    ListPaginationComponent,
    EditEmployeeComponent,
    EditEmployeeContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
