export interface Budget {
  income: BudgetCategory
  expenses: BudgetCategory
  profit?: BudgetProfit
  sheets: BudgetSheet[]
}

export interface BudgetCategory {
  id: number
  total: number
}

export interface BudgetSheet {
  id: number
  categoryId: number
  title: string
  items?: BudgetSheetItem[]
}

export interface BudgetSheetItem {
  label: string
  id: number
  yearly: number
  monthly: number
  note?: string
}

export interface BudgetProfit {
  value: number
}