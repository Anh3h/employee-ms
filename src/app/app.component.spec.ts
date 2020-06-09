import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastService } from './utils/services/toast.service';
import { Toast } from './utils/models/toast';
import { Subject } from 'rxjs';
import { ToastComponent } from './utils/components/toast/toast.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let toastService: Partial<ToastService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {

    let toastServiceStub = {
      toasts: [],
      toastsObservable: new Subject<Toast[]>()
    }

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavBarComponent,
        ToastComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ToastService, useValue: toastServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    toastService = TestBed.get(ToastService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as title 'weather-app'`, () => {

  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to weather-app!');
  // });
});
