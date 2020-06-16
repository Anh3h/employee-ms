import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListPaginationComponent } from './list-pagination.component';

describe('ListPaginationComponent', () => {
  let component: ListPaginationComponent;
  let fixture: ComponentFixture<ListPaginationComponent>;

  @Component({
    selector: 'pagination',
    template: ``,
  })
  class MockPaginationComponent {
    @Input()
    totalItems;

    @Input()
    itemsPerPage;

    @Output()
    pageChanged = new EventEmitter<any>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListPaginationComponent,
        MockPaginationComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display names of employees when provided a list of employees and "name" as display attribute', () => {
    component.displayAttribute = 'name';
    component.pageSize = 5;
    component.totalItems = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 },
      { id: 'oiuy56h', name: 'Mike Perry', salary: 90000, age: 30 },
      { id: 'df876cg', name: 'Stephane Hirally', salary: 200000, age: 35 },
      { id: '55df7hy', name: 'Clinton Cyrus', salary: 100000, age: 25 },
      { id: '56gh890', name: 'Tyler Johnson', salary: 100000, age: 30 },
      { id: 'd4h767i', name: 'Mary Pierre', salary: 75000, age: 28 }
    ];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(5);
    expect(fixture.debugElement.query(By.css('li span')).nativeElement.textContent).toContain('Samuel Johnson');
  });

  it('should call updateItem with employee\'s id when update button is clicked', () => {
    component.pageSize = 2;
    component.totalItems = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 },
      { id: 'oiuy56h', name: 'Mike Perry', salary: 90000, age: 30 }
    ];
    spyOn(component, 'updateItem')
    fixture.detectChanges();

    fixture.debugElement.query(By.css('li .update-btn')).nativeElement.click();

    expect(component.updateItem).toHaveBeenCalled();
    expect(component.updateItem).toHaveBeenCalledWith('ru2862s');
  });

  it('should emit update event with employeee\'s id when updateItem is called', () => {
    spyOn(component.update, 'emit');

    component.updateItem('ru2862s');

    expect(component.update.emit).toHaveBeenCalled();
    expect(component.update.emit).toHaveBeenCalledWith('ru2862s');
  });

  it('should call deleteItem with employee\'s id when delete button is clicked', () => {
    component.pageSize = 2;
    component.totalItems = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 },
      { id: 'oiuy56h', name: 'Mike Perry', salary: 90000, age: 30 }
    ];
    spyOn(component, 'deleteItem');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('li .delete-btn')).nativeElement.click();

    expect(component.deleteItem).toHaveBeenCalled();
    expect(component.deleteItem).toHaveBeenCalledWith('ru2862s');
  });

  it('should emit delete event with employeee\'s id when deleteItem is called', () => {
    spyOn(component.delete, 'emit');

    component.deleteItem('ru2862s');

    expect(component.delete.emit).toHaveBeenCalled();
    expect(component.delete.emit).toHaveBeenCalledWith('ru2862s');
  });

  it('should call pageChanged when pagination emit the pageChanged event', () => {
    component.pageSize = 1;
    component.totalItems = [
      { id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 },
      { id: 'iuy5688', name: 'Jane Doe', salary: 70000, age: 25 }
    ];
    spyOn(component, 'pageChanged');
    fixture.detectChanges();

    let pagination = fixture.debugElement.query(By.css('pagination')).componentInstance;
    pagination.pageChanged.emit();

    expect(component.pageChanged).toHaveBeenCalled();
  });
});
