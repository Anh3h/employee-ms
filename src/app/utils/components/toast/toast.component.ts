import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Toast } from '../../models/toast';

@Component({
  selector: 'app-toast',
  template: `
    <div>
      <alert type="success" [dismissible]="true" [dismissOnTimeout]="3000" (onClosed)="closed()">
        {{ toast.message }}
      </alert>
    </div>
  `,
  styles: [`
    .alert-success {
      background-color: rgb(212, 237, 218, 0.5) !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {

  @Input()
  toast: Toast;

  @Output()
  closedToast = new EventEmitter<Toast> ();

  constructor() { }

  ngOnInit() {
  }

  closed() {
    this.closedToast.emit(this.toast);
  }

}
