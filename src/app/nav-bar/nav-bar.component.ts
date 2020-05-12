import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" routerLink="">EmployeeDATA</a>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" routerLink="">Home</a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
