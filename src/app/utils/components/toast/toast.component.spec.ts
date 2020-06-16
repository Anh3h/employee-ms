import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  @Component({
    selector: 'alert',
    template: `<ng-content></ng-content>`
  })
  class MockAlertComponent {
    @Input()
    dismissible

    @Input()
    dismissOnTimeout

    @Output()
    onClosed = new EventEmitter<any>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToastComponent,
        MockAlertComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display call the alert input message', () => {
    component.toast = {id: 1, message: 'Successfully created employee'};
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('alert')).length).toBe(1);
    expect(fixture.debugElement.query(By.css('alert')).nativeElement.textContent)
      .toContain('Successfully created employee');
  });

  it('should call the closed method when the alert onClosed event is emitted', () => {
    component.toast = {id: 1, message: 'Successfully created employee'};
    spyOn(component, 'closed')
    fixture.detectChanges();

    let alertComponent = fixture.debugElement.query(By.css('alert')).componentInstance;

    alertComponent.onClosed.emit();
    expect(component.closed).toHaveBeenCalled();
  });
});
