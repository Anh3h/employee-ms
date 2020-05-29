import { Component } from '@angular/core';
import { ToastService } from './utils/services/toast.service';
import { Toast } from './utils/models/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  toasts = this.toastService.toastsObservable;

  constructor( private toastService: ToastService){}

  closedToast(toast: Toast) {
    this.toastService.remove(toast.id);
  }

}
