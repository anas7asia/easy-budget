import { createReducer, on, ActionReducer } from '@ngrx/store';
import { updateTotal } from './budget-category.actions';
import { BudgetCategory } from '../../interfaces/budget';
import { BudgetCategoryId } from '../../constants';
 
export const initialRevenueState: BudgetCategory = {
  id: BudgetCategoryId.revenue,
  total: 0
}

export const initialExpensesState: BudgetCategory = {
  id: BudgetCategoryId.expenses,
  total: 0
}
 
const updateTotalReducer = state => state

const _budgetRevenueReducer: ActionReducer<BudgetCategory> = createReducer(initialRevenueState,
  on(updateTotal, updateTotalReducer),
)

const _budgetExpensesReducer: ActionReducer<BudgetCategory> = createReducer(initialExpensesState,
  on(updateTotal, updateTotalReducer),
)
 
export function budgetRevenueReducer(state, action) {
  return _budgetRevenueReducer(state, action)
}

export function budgetExpensesReducer(state, action) {
  return _budgetExpensesReducer(state, action)
}
