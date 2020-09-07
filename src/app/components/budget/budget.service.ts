import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadSheets, addSheet, updateSheet, deleteSheet } from 'src/app/reducers/budget/budget-sheet.actions';
import { BudgetSheet, BudgetSheetItem } from 'src/app/interfaces/budget';
import { BudgetCategoryId, Colors, BudgetProperties } from 'src/app/constants';

const initialSheets: Pick<BudgetSheet, 'id'|'categoryId'|'title'|'items'>[] = [
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
];

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  
  sheets = initialSheets // raw data to be transformed to BudgetSheet[]

  constructor(private store: Store<State>,) { }

  loadSheets() {
    const sheets: BudgetSheet[] = this.sheets.map(sheet => this.parseRawSheetData(sheet))
    this.store.dispatch(loadSheets({sheets}))
  }

  addSheet(rawSheet: Pick<BudgetSheet, 'id'|'title'|'categoryId'>) {
    const sheet: BudgetSheet = this.parseRawSheetData({
      ...rawSheet,
      items: []
    })
    this.store.dispatch(addSheet({ sheet }));
  }

  updateSheet(sheet: BudgetSheet) {
    this.store.dispatch(updateSheet({sheet}))
  }

  deleteSheet(sheet: BudgetSheet) {
    this.store.dispatch(deleteSheet({sheet}))
  }

  parseRawSheetData(sheet: Pick<BudgetSheet, 'id'|'title'|'categoryId'|'items'>): BudgetSheet {
    return Object.assign({}, sheet, { 
      color: Colors[sheet.id],
      yearlySubtotal: this.calcSubtotal(sheet.items, BudgetProperties.yearly),
      monthlySubtotal: this.calcSubtotal(sheet.items, BudgetProperties.monthly),
    })
  }

  private calcSubtotal(items: BudgetSheetItem[], period: string): number {
    return items.reduce((subtotal, curr) => subtotal + curr[period], 0)
  }
}
