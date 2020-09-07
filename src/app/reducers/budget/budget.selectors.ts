import { createSelector } from '@ngrx/store';
import { BudgetSheet, Budget, BudgetCategory, BudgetSheetItem } from '../../interfaces/budget';
import { BudgetProperties } from '../../constants';

/* First level selectors */
export const selectSheets = (state: Budget) => state.sheets
export const selectIncome = (state: Budget) => state.income
export const selectExpenses = (state: Budget) => state.expenses

/* Second level selectors */
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

/* Third level selectors: total income/expenses */

const calcTotalAmount = (sheets: BudgetSheet[], property: string): number => {
  return sheets.reduce((total: number, sheet: BudgetSheet) => {
    return total + sheet[`${property}Subtotal`]
  }, 0)
}

export const selectMonthlyIncome = createSelector(
  selectIncomeSheets,
  (sheets: BudgetSheet[]) => calcTotalAmount(sheets, BudgetProperties.monthly)
)

export const selectYearlyIncome = createSelector(
  selectIncomeSheets,
  (sheets: BudgetSheet[]) => calcTotalAmount(sheets, BudgetProperties.yearly)
)

export const selectMonthlyExpenses = createSelector(
  selectExpensesSheets,
  (sheets: BudgetSheet[]) => calcTotalAmount(sheets, BudgetProperties.monthly)
)

export const selectYearlyExpenses = createSelector(
  selectExpensesSheets,
  (sheets: BudgetSheet[]) => calcTotalAmount(sheets, BudgetProperties.yearly)
)