import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockBudgetState, MockBudgetSheet } from '../../../testing/mock-budget'
import { BudgetSheetComponent } from './budget-sheet.component';
import { BudgetSheetItem, BudgetSheet } from '../../../interfaces/budget';
import { ReactiveFormsModule } from '@angular/forms';

const mockFormValue = {
  label: 'Beauty',
  monthly: 200,
  yearly: 2400
}

describe('BudgetSheetComponent', () => {
  let comp: BudgetSheetComponent;
  let fixture: ComponentFixture<BudgetSheetComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(BudgetSheetComponent, { add: {
      changeDetection: ChangeDetectionStrategy.Default
    }});
    TestBed.configureTestingModule({
      declarations: [ BudgetSheetComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSheetComponent);
    comp = fixture.componentInstance;
    comp.sheet = MockBudgetState.sheets[0];
    comp.totalYearlyIncome = 37320;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should calculate monthly subtotal', () => {
    const subtotal = fixture.nativeElement.querySelector('#js-monthly-subtotal');
    expect(subtotal.textContent).toContain(3000);
  });

  it('should calculate yearly subtotal', () => {
    const subtotal = fixture.nativeElement.querySelector('#js-yearly-subtotal');
    expect(subtotal.textContent).toContain(36000);
  });

  it('should show Add New Item form when Add Row button is clicked', () => {
    const btn = fixture.debugElement.query(By.css('#js-add-item'))
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should submit the form if it was filled correctly', () => {
    const addItemSpy = spyOn(comp, 'addNewItem');
  
    // show form
    comp.isAddingItem = true;
    
    // fill the form
    comp.newItemForm.setValue(mockFormValue);
    fixture.detectChanges();
  
    // submit button should be disabled, submit event won't be triggered
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'))
    submitBtn.nativeElement.click();
  
    expect(addItemSpy).toHaveBeenCalled();
  });
  
  it('should not be able to submit the form if it was not filled correctly', () => {
    const addItemSpy = spyOn(comp, 'addNewItem');
    // show form
    comp.isAddingItem = true;
    fixture.detectChanges();

    // submit button should be disabled, submit event won't be triggered
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'))
    submitBtn.nativeElement.click();

    expect(addItemSpy).not.toHaveBeenCalled();
  });

  it('should not raise the itemAdded event if data is missing', () => {
    let called = false;
    comp.sheetUpdated.subscribe(() => called = true);
    comp.addNewItem();
    expect(called).toBeFalse();
  });

  it('should raise the itemAdded if the form is filled correctly', () => {
    let called = false;
    comp.sheetUpdated.subscribe(() => called = true);
    comp.newItemForm.setValue(mockFormValue);

    comp.addNewItem();
    expect(called).toBeTrue();
  });
  
  it('should create a new item of correct type', () => {
    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);
    comp.newItemForm.setValue(mockFormValue);

    // check if all BudgetSheetItem properties are present in the created item
    const isRightType = (item: any): item is BudgetSheetItem => {
      return ['id', 'label', 'monthly', 'yearly'].every(prop => item.hasOwnProperty(prop));
    }
  
    comp.addNewItem();
    expect(isRightType(sheet.items[sheet.items.length-1])).toBeTrue();
  });

  // new id is last item id plus one
  it('should assign a proper id to a new item', () => {
    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);
    comp.newItemForm.setValue(mockFormValue);

    comp.addNewItem();
    expect(sheet.items[sheet.items.length-1].id).toBe(2);
  });

  it('should assign an id of zero to the first item', () => {
    comp.sheet = {
      title: 'Whatever',
      id: 3,
      categoryId: 0,
      items: [],
      yearlySubtotal: 0,
      monthlySubtotal: 0
    }
    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);
    comp.newItemForm.setValue(mockFormValue);

    comp.addNewItem();
    expect(sheet.items[sheet.items.length-1].id).toBe(0);
  });

  // form is valid when label/monthly/yearly are present or only label/monthly or label/yearly
  it('should check form valid state', () => {
    comp.newItemForm.patchValue({ label: 'Whatever' });
    expect(comp.newItemForm.valid).toBeFalse(); // missing monthly OR yearly
    
    comp.newItemForm.patchValue({ monthly: 10 });
    expect(comp.newItemForm.valid).toBeTrue(); //  label + monthly 

    comp.newItemForm.patchValue({ yearly: 120, monthly: null });
    expect(comp.newItemForm.valid).toBeTrue(); //  label + yearly 
  });

  it('should calculate yearly if monthly was provided', () => {
    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);
  
    comp.newItemForm.patchValue({label: 'Food', monthly: 400});
    comp.addNewItem();

    expect(sheet.items[sheet.items.length-1].yearly).toBe(4800);
  });
  
  it('should calculate monthly if yearly was provided', () => {
    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);
  
    comp.newItemForm.patchValue({label: 'Food', yearly: 3600});
    comp.addNewItem();
    expect(sheet.items[sheet.items.length-1].monthly).toBe(300);

    // round float numbers to two decimal places
    comp.newItemForm.patchValue({ yearly: 7777 });
    comp.addNewItem();
    expect(sheet.items[sheet.items.length-1].monthly).toBe(648.08);
  });

  it('should delete an item from the sheet', () => {
    comp.sheet = MockBudgetSheet;
    fixture.detectChanges();

    let sheet: BudgetSheet;
    comp.sheetUpdated.subscribe(e => sheet = e);

    comp.deleteItem(MockBudgetSheet.items[MockBudgetSheet.items.length - 1].id);

    expect(sheet.items.length).toBe(MockBudgetSheet.items.length - 1);
  });

  it('should delete the sheet', () => {
    let sheet: BudgetSheet;
    comp.sheetDeleted.subscribe(e => sheet = e);

    comp.deleteSheet();
    expect(sheet).toEqual(comp.sheet);
  });

  // percentage is the forth column in a sheet
  it('should calculate percentage of total income for an item', () => {

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    const percentage = tableRows[0].querySelectorAll('td')[3].textContent;
    // in mock state the yearly amount of the first item of the first sheet is 18000
    // 18000 is 48.23% of comp.totalYearlyIncome = 37320;
    expect(percentage).toBe('48.23%');
  });

  it('should calculate percentage of total income for a sheet', () => {
    // [Salary] 36000 of 37320 is 96.46%;
   const percentage = fixture.nativeElement.querySelectorAll('tfoot td')[3].textContent;
   expect(percentage).toBe('96.46%');
  });

  it('should not fail to calculate percentage if total amount is zero', () => {
    comp.totalYearlyIncome = 0;
    comp.sheet = Object.assign({}, comp.sheet, { items: []});
    fixture.detectChanges();
    const percentage = fixture.nativeElement.querySelectorAll('tfoot td')[3].textContent;
    expect(percentage).toBe('0%');
  });

  it('should display subtotal percentage of income', () => {
    // check the length of the line beneath sheet's title  
    const line = fixture.nativeElement.querySelector('hr');
    expect(line.style.width).toContain(96.46);
  });

});
