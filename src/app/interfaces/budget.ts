export interface Budget {
  income: BudgetCategory
  expenses: BudgetCategory
  profit?: BudgetProfit
  sheets: BudgetSheet[]
}

export interface BudgetCategory {
  readonly id: number
}

export interface BudgetSheet {
  readonly id: number
  readonly categoryId: number
  title: string
  items: BudgetSheetItem[]
  color?: string
}

export interface BudgetSheetItem {
  label: string
  id: number
  yearly: number
  monthly: number
}

export interface BudgetProfit {
  value: number
}