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
  yearlySubtotal: number
  monthlySubtotal: number
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

export interface BudgetChartCircle {
  radius: number
  strokeWidth: number
  strokeDasharray: string 
  strokeDashoffset: string
  color: string
}

export interface BudgetChartList {
  title: string
  color: string
}