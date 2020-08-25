import { ActionReducerMap } from '@ngrx/store';
import { Budget } from '../interfaces/budget';
import { budgetIncomeReducer, budgetExpensesReducer } from './budget/budget-category.reducers';
import { budgetSheetReducer } from './budget/budget-sheet.reducers';

export interface State extends Budget {}

export const reducers: ActionReducerMap<State> = {
  income: budgetIncomeReducer,
  expenses: budgetExpensesReducer,
  sheets: budgetSheetReducer
}


