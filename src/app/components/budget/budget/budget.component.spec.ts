import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../reducers';
import { initialState } from '../../../reducers/budget/budget-sheet.reducers';

import { BudgetSheet } from '../../../interfaces/budget';
import { BudgetCategoryId } from '../../../constants';

import { BudgetComponent } from './budget.component';
import { AddBudgetSheetComponent } from '../../../uicomponents/add-budget-sheet/add-budget-sheet.component';
import { BudgetSheetComponent } from '../../../uicomponents/budget-sheet/budget-sheet.component';

describe('BudgetComponent', () => {
  let comp: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BudgetComponent,
        MockComponent(AddBudgetSheetComponent),
        MockComponent(BudgetSheetComponent),
      ],
      // WARNING: integrational tests with the real store
      imports: [StoreModule.forRoot(reducers)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should add new sheet to the store', () => {
    comp.addNewSheet('Transport', BudgetCategoryId.expenses);
    fixture.detectChanges();

    let expensesSheetsContainer = fixture.nativeElement.querySelector('#js-expenses');
    let expensesSheets = expensesSheetsContainer.querySelectorAll('app-budget-sheet');

    const expectedLength = initialState.filter(s => s.categoryId === BudgetCategoryId.expenses).length + 1
    expect(expensesSheets.length).toBe(expectedLength);
  });

  it('should create a new sheet with proper data', () => {
    const expectedNewSheet: BudgetSheet = {
      id: initialState[initialState.length - 1].id + 1,
      categoryId: BudgetCategoryId.expenses,
      title: 'Transport',
      items: []
    }

    comp.addNewSheet('Transport', BudgetCategoryId.expenses);
    fixture.detectChanges();

    const expensesSheetsContainer = fixture.debugElement.query(By.css('#js-expenses'));
    const expensesSheets = expensesSheetsContainer.queryAll(By.css('app-budget-sheet'));

    expect(expensesSheets[expensesSheets.length - 1].context.sheet).toEqual(expectedNewSheet);
  });
});
