import { createAction, props } from '@ngrx/store';
import { BudgetSheet } from '../../interfaces/budget';

export const addSheet = createAction('[Budget Sheet] Add Sheet', props<{sheet: BudgetSheet}>())
export const updateSheet = createAction('[Budget Sheet] Edit Sheet', props<{sheet: BudgetSheet}>())
export const deleteSheet = createAction('[Budget Sheet] Delete Sheet', props<{sheet: BudgetSheet}>())
