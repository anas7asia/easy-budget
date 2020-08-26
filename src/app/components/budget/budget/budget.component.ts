import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectIncome, selectExpenses, selectIncomeSheets, selectExpensesSheets, selectSheets, selectMonthlyIncome, selectYearlyIncome, selectMonthlyExpenses, selectYearlyExpenses } from '../../../reducers/budget/budget.selectors';
import { addSheet, updateSheet } from '../../../reducers/budget/budget-sheet.actions';
import { Budget, BudgetSheet, BudgetCategory, BudgetSheetItem } from '../../../interfaces/budget';
import { BudgetCategoryId } from '../../../constants';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  income$: Observable<BudgetCategory> = this.store.pipe(select(selectIncome))
  expenses$: Observable<BudgetCategory> = this.store.pipe(select(selectExpenses))
  incomeSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectIncomeSheets))
  expensesSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectExpensesSheets))
  monthlyIncome$: Observable<number> = this.store.pipe(select(selectMonthlyIncome))
  yearlyIncome$: Observable<number> = this.store.pipe(select(selectYearlyIncome))
  monthlyExpenses$: Observable<number> = this.store.pipe(select(selectMonthlyExpenses))
  yearlyExpenses$: Observable<number> = this.store.pipe(select(selectYearlyExpenses))

  // Increment by 1 the last sheet's id to get a new sheet's id
  newSheetId$: Observable<number> = this.store.pipe(
    select(selectSheets),
    map(sheets => sheets[sheets.length - 1]),
    map(lastSheet => lastSheet.id + 1))

  readonly BudgetCategoryId = BudgetCategoryId
 
  constructor(private store: Store<Budget>) {}

  ngOnInit() {}

  addNewSheet(title: string, categoryId: number) {
    this.newSheetId$
      .pipe(first()) // prevent an infinite loop
      .subscribe(id => {
        this.store.dispatch(addSheet({ sheet: { title, categoryId, id, items: [] }}));
    })
  }

  updateSheet(sheet: BudgetSheet) {
    this.store.dispatch(updateSheet({sheet}))
  }

  ngOnDestroy() {
    // TODO: unsubscribe from newSheetId$
  }
}
