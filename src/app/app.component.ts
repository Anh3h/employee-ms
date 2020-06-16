import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ToastService } from './utils/services/toast.service';
import { Toast } from './utils/models/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  toasts$: Observable<Toast[]>;

  constructor( private toastService: ToastService){}

  ngOnInit() {
    this.toasts$ = this.toastService.getToasts();
  }

  closeToast(toast: Toast) {
    this.toastService.remove(toast.id);
  }

}
