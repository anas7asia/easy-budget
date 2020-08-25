import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-budget-sheet',
  templateUrl: './add-budget-sheet.component.html',
  styleUrls: ['./add-budget-sheet.component.scss']
})
export class AddBudgetSheetComponent {

  @Output() sheetAdded = new EventEmitter<string>()
  addSheetControl = new FormControl('', Validators.required)
  
  isFormVisible = false

  constructor() { }

  showForm() {
    this.isFormVisible = true
    // TODO: focus input
  }

  submitForm() {
    if (this.addSheetControl.value) {
      this.sheetAdded.emit(this.addSheetControl.value)
      this.isFormVisible = false
      this.addSheetControl.reset()
    }
  }
}
