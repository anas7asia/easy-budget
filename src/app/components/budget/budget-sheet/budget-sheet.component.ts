import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetSheet, BudgetSheetItem } from 'src/app/interfaces/budget';
import { BudgetProperties } from 'src/app/constants';
import { calcPercentage, roundNum, calcSubtotal } from 'src/app/utils';
import { MonthlyYearlyValidator } from './monthly-yearly.validator';

@Component({
  selector: 'app-budget-sheet',
  templateUrl: './budget-sheet.component.html',
  styleUrls: ['./budget-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSheetComponent {

  @Input() sheet: BudgetSheet
  @Input() totalYearlyIncome: number
  @Output() sheetUpdated = new EventEmitter<BudgetSheet>()
  @Output() sheetDeleted = new EventEmitter<BudgetSheet>()
  readonly BudgetProperties = BudgetProperties
  isAddingItem = false
  newItemForm = new FormGroup({
    label: new FormControl('', Validators.required),
    monthly: new FormControl(''),
    yearly: new FormControl(''),
  }, { validators: MonthlyYearlyValidator })
  calcPercentage = calcPercentage  


  showAddItemForm() {
    this.isAddingItem = !this.isAddingItem
  }

  /** 
  @desc Make sure all neccessary data is present
  Then create new item object with label, position, monthly, yearly
  Sent the newly created item to the higher places authorities
  */
  addNewItem() {
    const calcYearly = (m: number): number => roundNum(m * 12)
    const calcMonthly = (y: number): number => roundNum(y / 12)

    if (this.newItemForm.valid) {
      const newItem: BudgetSheetItem = { 
        id: this.sheet.items.length > 0 ? 
          this.sheet.items[this.sheet.items.length - 1].id + 1 : // increase last item's id by 1
          0, 
        label: this.newItemForm.value.label,
        monthly: this.newItemForm.value.monthly || calcMonthly(this.newItemForm.value.yearly),
        yearly: this.newItemForm.value.yearly || calcYearly(this.newItemForm.value.monthly)
      }

      const updatedItems = [...this.sheet.items, newItem]

      const updatedSheet = Object.assign({}, this.sheet, {
        items: updatedItems,
        ...this.updateSubtotal(updatedItems)
      })

      this.sheetUpdated.emit(updatedSheet)
      /* 
      There's no need to change isAddingItem value to false explicitely and reset the form,
      because current sheet gets updated in the store and this component is rerendered.
      Thus it is reinitialised (for exemple, ngOnInit is called) and its values are set to defult.
      */
    }
  }

  deleteItem(itemId: number) {
    const updatedItems = this.sheet.items.filter(i => i.id !== itemId)
    
    const updatedSheet = Object.assign({}, this.sheet, { 
      items: updatedItems,
      ...this.updateSubtotal(updatedItems)
    })

    this.sheetUpdated.emit(updatedSheet)
  }

  deleteSheet() {
    this.sheetDeleted.emit(this.sheet);
  }

  private updateSubtotal(items: BudgetSheetItem[]): Pick<BudgetSheet, 'monthlySubtotal'|'yearlySubtotal'> {
    return {
      monthlySubtotal: calcSubtotal(items, BudgetProperties.monthly),
      yearlySubtotal: calcSubtotal(items, BudgetProperties.yearly)
    }
  }
}
