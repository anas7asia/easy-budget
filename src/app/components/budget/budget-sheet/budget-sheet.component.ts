import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BudgetSheet, BudgetSheetItem } from '../../../interfaces/budget';
import { BudgetProperties } from '../../../constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MonthlyYearlyValidator } from './monthly-yearly.validator';

@Component({
  selector: 'app-budget-sheet',
  templateUrl: './budget-sheet.component.html',
  styleUrls: ['./budget-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSheetComponent {

  @Input() sheet: BudgetSheet
  @Output() sheetUpdated = new EventEmitter<BudgetSheet>()
  @Output() sheetDeleted = new EventEmitter<BudgetSheet>()
  readonly BudgetProperties = BudgetProperties
  isAddingItem = false
  newItemForm = new FormGroup({
    label: new FormControl('', Validators.required),
    monthly: new FormControl(''),
    yearly: new FormControl(''),
  }, { validators: MonthlyYearlyValidator })

  calcSubtotal(property: string): number {
    return this.sheet.items.reduce((acc: number, item: BudgetSheetItem) => {
      return acc + item[property]
    }, 0)
  }

  showAddItemForm() {
    this.isAddingItem = !this.isAddingItem
  }

  /** 
  @desc Make sure all neccessary data is present
  Then create new item object with label, position, monthly, yearly
  Sent the newly created item to the higher places authorities
  */
  addNewItem() {
    const calcYearly = (m: number): number => m * 12

    /* let an integer be as it is or round a float number to maximum two decimal places of precision: 
      2.25 ==> 2.25
      3.33333333 ==> 3.33 */
    const calcMonthly = (y: number): number => {
      const countDecimalPlaces = (floatNum: number) => `${floatNum}`.split('.')[1].length
      const result = y / 12
      return Number.isInteger(result) ?
        result :
        countDecimalPlaces(result) > 2 ?
          parseFloat(result.toFixed(2)) :
          result
    }

    if (this.newItemForm.valid) {
      const newItem: BudgetSheetItem = { 
        id: this.sheet.items.length > 0 ? 
          this.sheet.items[this.sheet.items.length - 1].id + 1 : // increase last item's id by 1
          0, 
        label: this.newItemForm.value.label,
        monthly: this.newItemForm.value.monthly || calcMonthly(this.newItemForm.value.yearly),
        yearly: this.newItemForm.value.yearly || calcYearly(this.newItemForm.value.monthly)
      }
      const updatedSheet = Object.assign({}, this.sheet)
      updatedSheet.items = [...updatedSheet.items, newItem]
      this.sheetUpdated.emit(updatedSheet)
      /* 
      There's no need to change isAddingItem value to false explicitely and reset the form,
      because current sheet gets updated in the store and this component is rerendered.
      Thus it is reinitialised (for exemple, ngOnInit is called) and its values are set to defult.
      */

    }
  }

  deleteItem(itemId: number) {
    const updatedSheet = Object.assign(
      {},
      this.sheet,
      { items: this.sheet.items.filter(i => i.id !== itemId) })

    this.sheetUpdated.emit(updatedSheet)
  }

  deleteSheet() {
    this.sheetDeleted.emit(this.sheet);
  }
}
