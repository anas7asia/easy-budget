import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BudgetSheet, BudgetSheetItem } from '../../interfaces/budget';
import { BudgetProperties } from '../../constants';

@Component({
  selector: 'app-budget-sheet',
  templateUrl: './budget-sheet.component.html',
  styleUrls: ['./budget-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSheetComponent implements OnInit {

  @Input() sheet: BudgetSheet
  readonly BudgetProperties = BudgetProperties

  constructor() { }

  ngOnInit(): void {
  }

  calcSubtotal(property: string): number {
    return this.sheet.items.reduce((acc: number, item: BudgetSheetItem) => {
      return acc + item[property]
    }, 0)
  }

}
