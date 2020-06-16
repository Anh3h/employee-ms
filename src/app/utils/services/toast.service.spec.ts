import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

let service: ToastService;

describe('ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new message to stack of pending stack toast messages', () => {
    let toasts;
    service.getToasts().subscribe(tst => toasts = tst);
    service.show('Success Message');

    expect(toasts.length).toBe(1);
  });

  it('should remove message from pending stack when remove request is made', () => {
    let toasts;
    service.getToasts().subscribe(tst => toasts = tst);
    service.show('Success Message');
    expect(toasts.length).toBe(1)

    service.remove(toasts[0].id);
    expect(toasts.length).toBe(0);
  })
});
