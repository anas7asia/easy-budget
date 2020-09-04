import { createReducer, on, ActionReducer } from '@ngrx/store';
import { addSheet, updateSheet, deleteSheet, loadSheets } from './budget-sheet.actions';
import { BudgetSheet } from '../../interfaces/budget';
import { BudgetCategoryId } from '../../constants';
 
export const initialState: BudgetSheet[] = []
 
const _budgetSheetReducer: ActionReducer<BudgetSheet[]> = createReducer(initialState,
  on(loadSheets, (state, payload) => payload.sheets),
  on(addSheet, (state, payload) => [...state, payload.sheet]),
  on(updateSheet, (state, payload) => state.map(sheet => sheet.id === payload.sheet.id ? payload.sheet : sheet)),
  on(deleteSheet, (state, payload) => state.filter(sheet => sheet.id !== payload.sheet.id))
)
 
export function budgetSheetReducer(state, action) {
  return _budgetSheetReducer(state, action);
}