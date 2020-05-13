import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { EmployeesContainerComponent } from './employee/containers/employees-container.component';
import { EmployeesComponent } from './employee/components/employees.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ListPaginationComponent } from './utils/list-pagination/list-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    EmployeesContainerComponent,
    EmployeesComponent,
    ListPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
