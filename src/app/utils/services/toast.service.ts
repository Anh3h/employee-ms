import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: Toast[] = [];
  private _toasts$ = new Subject<Toast[]>();

  constructor() { }

  getToasts(): Observable<Toast[]> {
    return this._toasts$.asObservable();
  }

  show(message: string) {
    let id = this.toasts.length == 0 ? 0 : this.toasts[this.toasts.length - 1].id + 1;
    let toast = <Toast> { id, message }

    this.toasts.push(toast);
    this._toasts$.next(this.toasts);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id != id);
    this._toasts$.next(this.toasts);
  }
}
