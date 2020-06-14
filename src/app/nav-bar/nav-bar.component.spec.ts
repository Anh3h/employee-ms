import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ NavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display "home" and "employee" navigation options.', () => {
    let linkElts = fixture.debugElement.queryAll(By.css('a'))

    expect( linkElts.length ).toBe(2)
    expect( linkElts[0].nativeElement.textContent ).toContain("HOME");
    expect( linkElts[0].nativeElement.getAttribute('routerLink') ).toBe("/");
    expect( linkElts[1].nativeElement.textContent ).toContain("EMPLOYEES");
    expect( linkElts[1].nativeElement.getAttribute('routerLink') ).toBe("/employees");
  })
});
