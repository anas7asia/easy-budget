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
      ],
      color: '#ffffff',
      yearlySubtotal: 36000,
      monthlySubtotal: 3000
    },
    { 
      title: 'Dividends', 
      id: 1, 
      categoryId: BudgetCategoryId.income, 
      items: [
        { id: 0, label: 'Tesla', yearly: 1200, monthly: 100 },
        { id: 1, label: 'Amazon', yearly: 120, monthly: 10 }
      ],
      color: '#000000',
      yearlySubtotal: 1320,
      monthlySubtotal: 110
    },
    { 
      title: 'Housing', 
      id: 2, 
      categoryId: BudgetCategoryId.expenses,
      items: [
       { id: 0, label: 'Rent', yearly: 7200, monthly: 600 },
       { id: 1, label: 'Insurance', yearly: 360, monthly: 30 }
      ],
      color: '#f0f0f0',
      yearlySubtotal: 7560,
      monthlySubtotal: 630
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
  ],
  color: '#fdfdfd',
  yearlySubtotal: 3360,
  monthlySubtotal: 280
}

export const MockBudgetSheetItem: BudgetSheetItem = {
  id: 2,
  label: 'Bonus',
  monthly: 100,
  yearly: 1200
}