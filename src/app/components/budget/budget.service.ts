import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadSheets, addSheet, updateSheet, deleteSheet } from 'src/app/reducers/budget/budget-sheet.actions';
import { BudgetSheet, BudgetSheetItem } from 'src/app/interfaces/budget';
import { BudgetCategoryId, Colors, BudgetProperties } from 'src/app/constants';
import { calcSubtotal } from 'src/app/utils';

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
      { id: 1, label: 'BeyondMeat', yearly: 120, monthly: 10 },
      { id: 1, label: 'Apple', yearly: 3600, monthly: 300 }
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
  },
  { 
    title: 'Transport', 
    id: 3, 
    categoryId: BudgetCategoryId.expenses,
    items: [
      { id: 0, label: 'Car', yearly: 3600, monthly: 300 },
      { id: 1, label: 'Gaz', yearly: 720, monthly: 60 }
    ]
  },
  { 
    title: 'Food', 
    id: 4, 
    categoryId: BudgetCategoryId.expenses,
    items: [
      { id: 0, label: 'Groceries', yearly: 4800, monthly: 400 },
      { id: 1, label: 'Eating Out', yearly: 1440, monthly: 120 }
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
      yearlySubtotal: calcSubtotal(sheet.items, BudgetProperties.yearly),
      monthlySubtotal: calcSubtotal(sheet.items, BudgetProperties.monthly),
    })
  }
}
