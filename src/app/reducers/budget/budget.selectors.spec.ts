import * as selectors from './budget.selectors';
import { BudgetCategoryId } from '../../constants';
import { MockBudgetState } from '../../testing/mock-budget';

describe('Budget Selectors', () => {

  it('should select income sheets only', () => {
    const incomeSheets = selectors.selectIncomeSheets.projector(MockBudgetState.income, MockBudgetState.sheets)
    const expectedResult = MockBudgetState.sheets.filter(s => s.categoryId === BudgetCategoryId.income)
    expect(incomeSheets.length).toBe(expectedResult.length);
  });
  
  it('should select expenses sheets only', () => {
    const expensesSheets = selectors.selectExpensesSheets.projector(MockBudgetState.expenses, MockBudgetState.sheets)
    const expectedResult = MockBudgetState.sheets.filter(s => s.categoryId === BudgetCategoryId.expenses)
    expect(expensesSheets.length).toBe(expectedResult.length);
  });
});