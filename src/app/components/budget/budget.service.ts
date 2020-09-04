import { Injectable } from '@angular/core';
import { BudgetSheet } from 'src/app/interfaces/budget';
import { BudgetCategoryId, Colors } from 'src/app/constants';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadSheets } from 'src/app/reducers/budget/budget-sheet.actions';

const initialSheets: BudgetSheet[] = [
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

  constructor(private store: Store<State>,) { }

  loadSheets() {
    /* 
    1. Load sheets from anywhere you want
    2. Then parse them to assign color
    3. Then add them to the store 
    */
    const sheets = initialSheets.map(sheet => {
      return Object.assign(sheet, { color: Colors[sheet.id] })
    });

    this.store.dispatch(loadSheets({sheets}))
  }
}
