import { createReducer, on, ActionReducer } from '@ngrx/store';
import { addSheet, updateSheet, deleteSheet } from './budget-sheet.actions';
import { BudgetSheet } from '../../interfaces/budget';
import { BudgetCategoryId } from '../../constants';
 
export const initialState: BudgetSheet[] = [
  {
    title: 'Salary',
    id: 0,
    categoryId: BudgetCategoryId.income,
    items: [
      { id: 0, label: 'My Salary', yearly: 18000, monthly: 1500 },
      { id: 1, label: 'My Spouse Salary', yearly: 18000, monthly: 1500 }
    ]
  },
  { 
    title: 'Dividends', 
    id: 1, 
    categoryId: BudgetCategoryId.income, 
    items: [
      { id: 0, label: 'Tesla', yearly: 1200, monthly: 100 },
      { id: 1, label: 'Amazon', yearly: 120, monthly: 10 }
    ] 
  },
  { 
    title: 'Housing', 
    id: 2, 
    categoryId: BudgetCategoryId.expenses,
    items: [
      { id: 0, label: 'Rent', yearly: 7200, monthly: 600 },
      { id: 1, label: 'Insurance', yearly: 360, monthly: 30 }
    ]
  }
]
 
const _budgetSheetReducer: ActionReducer<BudgetSheet[]> = createReducer(initialState,
  on(addSheet, (state, payload) => [...state, payload.sheet]),
  on(updateSheet, (state, payload) => state.map(sheet => sheet.id === payload.sheet.id ? payload.sheet : sheet)),
  on(deleteSheet, (state, payload) => state.filter(sheet => sheet.id !== payload.sheet.id))
)
 
export function budgetSheetReducer(state, action) {
  return _budgetSheetReducer(state, action);
}