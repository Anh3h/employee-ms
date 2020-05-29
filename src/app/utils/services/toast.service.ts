import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: Toast[] = [];
  toastsObservable = new Subject<Toast[]>();

  constructor() { }

  show(message: string) {
    let id = this.toasts.length == 0 ? 0 : this.toasts[this.toasts.length - 1].id + 1;
    let toast = <Toast> { id, message }

    this.toasts.push(toast);
    this.toastsObservable.next(this.toasts)
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id != id)
  }
}
