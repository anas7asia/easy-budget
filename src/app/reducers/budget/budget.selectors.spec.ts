import * as selectors from './budget.selectors';
import { BudgetCategoryId } from '../../constants';
import { MockBudgetState } from '../../testing/mock-budget';

describe('Budget Selectors', () => {

  const incomeSheets = getSheets(BudgetCategoryId.income);
  const expensesSheets = getSheets(BudgetCategoryId.expenses);

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

  it('should calculate total monthly income', () => {
    const total = selectors.selectMonthlyIncome.projector(incomeSheets)
    expect(total).toBe(3110);
  });

  it('should calculate total yearly income', () => {
    const total = selectors.selectYearlyIncome.projector(incomeSheets)
    expect(total).toBe(37320);
  });

  it('should calculate total monthly expenses', () => {
    
    const total = selectors.selectMonthlyExpenses.projector(expensesSheets)
    expect(total).toBe(630);
  });

  it('should calculate total yearly expenses', () => {
    const total = selectors.selectYearlyExpenses.projector(expensesSheets)
    expect(total).toBe(7560);

    const total1 = selectors.selectYearlyExpenses.projector([]);
    expect(total1).toBe(0);
  });

  function getSheets(categoryId: number) {
    return MockBudgetState.sheets.filter(s => s.categoryId === categoryId)
  }
});