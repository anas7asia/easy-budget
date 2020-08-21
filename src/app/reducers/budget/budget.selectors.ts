import { createSelector } from '@ngrx/store';
import { BudgetSheet, BudgetPlanner, BudgetCategory } from '../../interfaces/budget';

export const selectSheets = (state: BudgetPlanner) => state.sheets
export const selectRevenue = (state: BudgetPlanner) => state.revenue
export const selectExpenses = (state: BudgetPlanner) => state.expenses

export const selectRevenueSheets = createSelector(
  selectRevenue,
  selectSheets,
  (category: BudgetCategory, allSheets: BudgetSheet[]) => {
    return allSheets.filter((sheet: BudgetSheet) => sheet.categoryId === category.id) || []
  }
)

export const selectExpensesSheets = createSelector(
  selectExpenses,
  selectSheets,
  (category: BudgetCategory, allSheets: BudgetSheet[]) => {
    return allSheets.filter((sheet: BudgetSheet) => sheet.categoryId === category.id) || []
  }
)
