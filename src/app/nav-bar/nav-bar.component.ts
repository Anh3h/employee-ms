import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a class="nav-link" routerLink="/" routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: true}">HOME</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/employees" routerLinkActive="active"
        [routerLinkActiveOptions]="{exact: true}">EMPLOYEES</a>
      </li>
    </ul>
  `,
  styles: [`
    a, a:hover {text-decoration: underline}
    a:hover {color: #007bff}
    ul {padding-top: 2%}
    a.active {text-decoration: none}
  `]
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
