import { ActionReducerMap } from '@ngrx/store';
import { BudgetPlanner } from '../interfaces/budget';
import { budgetRevenueReducer, budgetExpensesReducer } from './budget/budget-category.reducers';
import { budgetSheetReducer } from './budget/budget-sheet.reducers';

export interface State extends BudgetPlanner {}

export const reducers: ActionReducerMap<State> = {
  revenue: budgetRevenueReducer,
  expenses: budgetExpensesReducer,
  sheets: budgetSheetReducer
}


