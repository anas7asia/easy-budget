import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BudgetSheetComponent } from './budget-sheet.component';

describe('TableComponent', () => {
  let component: BudgetSheetComponent;
  let fixture: ComponentFixture<BudgetSheetComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(BudgetSheetComponent, { add: {
      changeDetection: ChangeDetectionStrategy.Default
    }});
    TestBed.configureTestingModule({
      declarations: [ BudgetSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should raise the delete event on delete item button click', () => {
  //   const deleteBtn = fixture.debugElement.query(By.css('#js-delete-item'))
  //   let deletedItem: number
  //   component.deleted.subscribe(itemId => deletedItem = itemId)

  //   deleteBtn.triggerEventHandler('click', null)
  //   expect(deletedItem).toBe(1)
  // });
});
