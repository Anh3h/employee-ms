import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaginationComponent } from './list-pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListPaginationComponent', () => {
  let component: ListPaginationComponent;
  let fixture: ComponentFixture<ListPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListPaginationComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
