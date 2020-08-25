import { createReducer, on, ActionReducer } from '@ngrx/store';
import { addItem, editItem, deleteItem, addSheet, editSheet, deleteSheet } from './budget-sheet.actions';
import { BudgetSheet } from '../../interfaces/budget';
import { BudgetCategoryId } from '../../constants';
 
export const initialState: BudgetSheet[] = [
  {
    id: 1,
    categoryId: BudgetCategoryId.income,
    title: 'Salary',
    items: [
      { label: 'Your name', monthly: 1500, yearly: 18000, id: 1 }
    ]
  },
  { 
    id: 2,
    categoryId: BudgetCategoryId.expenses,
    title: 'Housing',
    items: [
      { label: 'Rent', monthly: 700, yearly: 8400, id: 1 },
      { label: 'Insurance', monthly: 30, yearly: 360, id: 2 }
    ]
  }
]
 
const _budgetSheetReducer: ActionReducer<BudgetSheet[]> = createReducer(initialState,
  on(addSheet, (state, payload) => [...state, payload.sheet]),
  on(editSheet, state => state),
  on(deleteSheet, state => state),
  on(addItem, state => [...state] ),
  on(editItem, state => [...state]),
  on(deleteItem, state => [...state])
)
 
export function budgetSheetReducer(state, action) {
  return _budgetSheetReducer(state, action);
}