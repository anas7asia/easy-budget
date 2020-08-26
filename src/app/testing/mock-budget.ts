import { Budget, BudgetSheetItem, BudgetSheet } from "../interfaces/budget";
import { BudgetCategoryId } from "../constants";

export const MockBudgetState: Budget = {
  income: {
    id: BudgetCategoryId.income
  },
  expenses: {
    id: BudgetCategoryId.expenses
  },
  sheets: [
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
}

export const MockBudgetSheet: BudgetSheet = {
  id: 2,
  title: 'Transport',
  categoryId: BudgetCategoryId.expenses,
  items: [
    { id: 0, label: 'Car', yearly: 2400, monthly: 200 },
    { id: 1, label: 'Gas', yearly: 960, monthly: 80 }
  ]
}

export const MockBudgetSheetItem: BudgetSheetItem = {
  id: 2,
  label: 'Bonus',
  monthly: 100,
  yearly: 1200
}