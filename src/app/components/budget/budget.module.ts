import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BudgetComponent } from './budget/budget.component';
import { AddBudgetSheetComponent } from './add-budget-sheet/add-budget-sheet.component';
import { BudgetSheetComponent } from './budget-sheet/budget-sheet.component';

@NgModule({
  declarations: [
    BudgetComponent,
    BudgetSheetComponent,
    AddBudgetSheetComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BudgetComponent
  ]
})
export class BudgetModule { }
