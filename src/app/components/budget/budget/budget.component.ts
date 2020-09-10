import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectIncomeSheets, selectExpensesSheets, selectSheets, selectMonthlyIncome, selectYearlyIncome, selectMonthlyExpenses, selectYearlyExpenses } from 'src/app/reducers/budget/budget.selectors';
import { BudgetSheet } from 'src/app/interfaces/budget';
import { BudgetCategoryId } from 'src/app/constants';
import { State } from 'src/app/reducers';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  incomeSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectIncomeSheets))
  expensesSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectExpensesSheets))
  monthlyIncome$: Observable<number> = this.store.pipe(select(selectMonthlyIncome))
  yearlyIncome$: Observable<number> = this.store.pipe(select(selectYearlyIncome))
  monthlyExpenses$: Observable<number> = this.store.pipe(select(selectMonthlyExpenses))
  yearlyExpenses$: Observable<number> = this.store.pipe(select(selectYearlyExpenses))
  allSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectSheets))
    
  readonly BudgetCategoryId = BudgetCategoryId
  
  constructor(
    private store: Store<State>,
    private budgetService: BudgetService) {}
    
  ngOnInit() {
    this.budgetService.loadSheets();
  }
    
  addNewSheet(title: string, categoryId: number) {
    this.allSheets$
      .pipe(
        // prevent an infinite loop by taking only one value
        first(), 
        // increment by 1 the last sheet's id to start counting from zero
        map(sheets => sheets.length > 0 ? sheets[sheets.length - 1].id + 1 : 0)) 
      .subscribe(id => {
        this.budgetService.addSheet({title, categoryId, id})
    })
  }

  updateSheet(sheet: BudgetSheet) {
    this.budgetService.updateSheet(sheet)
  }
  
  deleteSheet(sheet: BudgetSheet) {
    this.budgetService.deleteSheet(sheet)
  }

  ngOnDestroy() {
    // TODO: unsubscribe from allSheets$
  }
}
