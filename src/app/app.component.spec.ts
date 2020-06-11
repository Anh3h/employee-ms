import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ToastService } from './utils/services/toast.service';
import { Toast } from './utils/models/toast';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let toastService: Partial<ToastService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockToastService;

  @Component({
    selector: 'app-nav-bar',
    template: `<div>Nav bar...</div>`
  })
  class MockNavBarComponent {
    constructor() { }
  }

  @Component({
    selector: 'app-toast',
    template: `<div>Toastr ...</div> `
  })
  class MockToastComponent {

    @Input()
    toast: Toast;

    @Output()
    closedToast = new EventEmitter<Toast> ();

    constructor() { }

  }

  beforeEach(async(() => {
    mockToastService = jasmine.createSpyObj('mockToastService', ['getToasts', 'remove'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent,
        MockNavBarComponent,
        MockToastComponent
      ],
      providers: [{ provide: ToastService, useValue: mockToastService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    toastService = TestBed.get(ToastService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render toast from toast service', () => {
    mockToastService.getToasts.and.returnValue( of([<Toast> {id: 1, message: 'Successfully created employee'}]) );
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-toast')).length).toBe(1);
  });

  it('should close the toast when app-toast emits a closedToast event', () => {
    let toasts = [
      {id: 1, message: 'Successfully created employee'},
      {id: 2, message: 'Successfully updated employee'}
    ];
    mockToastService.getToasts.and.returnValue(of(toasts))
    spyOn(component, 'closeToast')
    fixture.detectChanges();

    const firstToastComponent = fixture.debugElement.queryAll(By.css('app-toast'))[0].componentInstance;
    firstToastComponent.closedToast.emit(toasts[0]);

    expect(component.closeToast).toHaveBeenCalled();
    expect(component.closeToast).toHaveBeenCalledWith(toasts[0]);
  })

  it('should call toastService.remove method when closeToast is called', () => {
    component.closeToast(<Toast> {id: 1, message: 'Successfully created employee'});

    expect(toastService.remove).toHaveBeenCalled();
  })
});
