import { createAction, props } from '@ngrx/store';
import { BudgetSheet } from '../../interfaces/budget';

export const addSheet = createAction('[Budget Sheet] Add Sheet', props<{sheet: BudgetSheet}>())
export const editSheet = createAction('[Budget Sheet] Edit Sheet')
export const deleteSheet = createAction('[Budget Sheet] Delete Sheet')

export const addItem = createAction('[Budget Sheet] Add Item')
export const editItem = createAction('[Budget Sheet] Edit Item')
export const deleteItem = createAction('[Budget Sheet] Delete Item')