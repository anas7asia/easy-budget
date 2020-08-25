import { createSelector } from '@ngrx/store';
import { BudgetSheet, Budget, BudgetCategory } from '../../interfaces/budget';

export const selectSheets = (state: Budget) => state.sheets
export const selectIncome = (state: Budget) => state.income
export const selectExpenses = (state: Budget) => state.expenses

const selectSheetsForCategory = (category: BudgetCategory, allSheets: BudgetSheet[]) => {
  return allSheets.filter((sheet: BudgetSheet) => sheet.categoryId === category.id) || []
}

export const selectIncomeSheets = createSelector(
  selectIncome,
  selectSheets,
  selectSheetsForCategory
)

export const selectExpensesSheets = createSelector(
  selectExpenses,
  selectSheets,
  selectSheetsForCategory
)
