import { Component, OnInit, Input } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.css']
})
export class ListPaginationComponent implements OnInit {

  displayedItems: any[];
  _pageSize: number = 0;
  _totalItems: any[];

  @Input()
  attribute: string;

  @Input()
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
  }

  get pageSize() {
    return this._pageSize;
  }

  @Input()
  set totalItems(totalItems: any[]) {
    this._totalItems = totalItems? totalItems: [];
    this.displayedItems = this._totalItems.slice(0, this.pageSize);
  }

  get totalItems() {
    return this._totalItems;
  }

  constructor() { }

  ngOnInit() {
  }

  pageChanged(event:PageChangedEvent): void {
    const startIndex = (event.page - 1) * event.itemsPerPage;
    const endIndex = event.page * event.itemsPerPage;
    this.displayedItems = this._totalItems.slice(startIndex, endIndex);
  }
}
