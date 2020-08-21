import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectRevenueSheets, selectExpensesSheets, selectRevenue, selectExpenses } from './reducers/budget/budget.selectors';
import { BudgetPlanner, BudgetSheet, BudgetCategory } from './interfaces/budget';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  revenue: Observable<BudgetCategory> = this.store.pipe(select(selectRevenue))
  expenses: Observable<BudgetCategory> = this.store.pipe(select(selectExpenses))
  revenueSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectRevenueSheets))
  expensesSheets$: Observable<BudgetSheet[]> = this.store.pipe(select(selectExpensesSheets))
 
  constructor(private store: Store<BudgetPlanner>) {}

  ngOnInit() {}
}
