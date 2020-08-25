import { createReducer, on, ActionReducer } from '@ngrx/store';
import { updateTotal } from './budget-category.actions';
import { BudgetCategory } from '../../interfaces/budget';
import { BudgetCategoryId } from '../../constants';
 
export const initialIncomeState: BudgetCategory = {
  id: BudgetCategoryId.income
}

export const initialExpensesState: BudgetCategory = {
  id: BudgetCategoryId.expenses
}
 
const updateTotalReducer = state => state

const _budgetIncomeReducer: ActionReducer<BudgetCategory> = createReducer(initialIncomeState,
  on(updateTotal, updateTotalReducer),
)

const _budgetExpensesReducer: ActionReducer<BudgetCategory> = createReducer(initialExpensesState,
  on(updateTotal, updateTotalReducer),
)
 
export function budgetIncomeReducer(state, action) {
  return _budgetIncomeReducer(state, action)
}

export function budgetExpensesReducer(state, action) {
  return _budgetExpensesReducer(state, action)
}
