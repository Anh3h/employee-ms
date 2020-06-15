import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-list-pagination',
  template: ''
})
class MockListPaginationComponent {

  @Input()
  totalItems;

  @Input()
  pageSize;

  @Input()
  displayAttribute

  @Output()
  update = new EventEmitter<string>();


  @Output()
  delete = new EventEmitter<string>();

}

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        EmployeesComponent,
        MockListPaginationComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    component.employees = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 }
    ]
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display a link to add new employees', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('routerLink')).toBe('new');
  });

  it('should display a list of employees', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-list-pagination'))).toBeTruthy();
  });

  it('should call updateEmployee when app-list-pagination emits an update event', () => {
    spyOn(component, 'updateEmployee');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('app-list-pagination')).componentInstance.update.emit();

    expect(component.updateEmployee).toHaveBeenCalled();
  });

  it('should call deleteEmployee when app-list-pagination emits a delete event', () => {
    spyOn(component, 'deleteEmployee');
    spyOn(component.delete, 'emit');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('app-list-pagination')).componentInstance.delete.emit();

    expect(component.deleteEmployee).toHaveBeenCalled();
  });

  it('should emit delete event when deleteEmployee method is called', () => {
    spyOn(component.delete, 'emit');
    fixture.detectChanges();

    component.deleteEmployee('rt56ru')

    expect(component.delete.emit).toHaveBeenCalled();
  });
});
