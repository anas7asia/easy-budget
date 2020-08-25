import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetComponent } from './budget/budget.component';
import { UiComponentsModule } from '../../uicomponents/uicomponents.module';

@NgModule({
  declarations: [
    BudgetComponent
  ],
  imports: [
    UiComponentsModule,
    CommonModule
  ],
  exports: [
    BudgetComponent
  ]
})
export class BudgetModule { }
