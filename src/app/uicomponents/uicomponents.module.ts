import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddBudgetSheetComponent } from './add-budget-sheet/add-budget-sheet.component';
import { BudgetSheetComponent } from './budget-sheet/budget-sheet.component';

@NgModule({
  declarations: [
    BudgetSheetComponent,
    AddBudgetSheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BudgetSheetComponent,
    AddBudgetSheetComponent
  ]
})
export class UiComponentsModule { }
