import { Budget } from "../interfaces/budget";
import { BudgetCategoryId } from "../constants";

export const MockBudgetState: Budget = {
  income: {
    id: BudgetCategoryId.income,
    total: 3110
  },
  expenses: {
    id: BudgetCategoryId.expenses,
    total: 630
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