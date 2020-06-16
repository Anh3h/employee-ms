import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EditEmployeeComponent } from './edit-employee.component';
import { Employee } from '../../models/Employee';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  const employee = <Employee>{ id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ EditEmployeeComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize employeeForm when provided an employee as input', () => {
    component.employee = employee;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('input#name')).nativeElement.value).toEqual(employee.name);
    expect(fixture.debugElement.query(By.css('input#salary')).nativeElement.value).toBe(`${employee.salary}`);
    expect(fixture.debugElement.query(By.css('input#age')).nativeElement.value).toBe(`${employee.age}`);
  });

  it('should initialize employeeForm with empty values when provided an empty employee object as input', () => {
    component.employee = <Employee> {};
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('input#name')).nativeElement.value).toEqual('');
    expect(fixture.debugElement.query(By.css('input#salary')).nativeElement.value).toBe('');
    expect(fixture.debugElement.query(By.css('input#age')).nativeElement.value).toBe('');
  });

  it('should call saveEmployee when submit button is clicked and form is valid', () => {
    spyOn(component, 'saveForm')
    component.employee = employee;
    fixture.detectChanges()
    expect(component.employeeForm.valid).toBeTruthy();

    component.employeeForm.controls['name'].setValue('Mercy Michel');
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.saveForm).toHaveBeenCalled();
    expect(component.employeeForm.controls['name'].value).toEqual('Mercy Michel');
  });

  it('should emit onSaveEmployee event when saveForm method is called with a validate employeeForm', () => {
    spyOn(component.onSaveEmployee, 'emit');
    component.employee = employee;
    fixture.detectChanges();
    component.saveForm();

    expect(component.employeeForm.valid).toBeTruthy();
    expect(component.onSaveEmployee.emit).toHaveBeenCalled();
  });

  it('should fail to emit onSaveEmployee event if employeeForm is invalid', () => {
    spyOn(component.onSaveEmployee, 'emit');
    component.employee = employee;
    fixture.detectChanges();
    component.employeeForm.controls['name'].setValue(null);
    component.saveForm();

    expect(component.employeeForm.valid).toBeFalsy();
    expect(component.onSaveEmployee.emit).toHaveBeenCalledTimes(0);
  });

  it('should invalidate employeeForm when input name is not provided', () => {
    component.employee = employee;
    fixture.detectChanges();
    component.employeeForm.controls['name'].setValue(null);

    expect(component.employeeForm.valid).toBeFalsy();
  });

  it('should invalidate employeeForm when input age is less than one', () => {
    component.employee = employee;
    fixture.detectChanges();

    component.employeeForm.controls['age'].setValue(0);

    expect(component.employeeForm.valid).toBeFalsy();
  });

  it('should invalidate employeeForm when input salary is less than ten', () => {
    component.employee = employee;
    fixture.detectChanges();

    component.employeeForm.controls['salary'].setValue(9);

    expect(component.employeeForm.valid).toBeFalsy();
  });
});
