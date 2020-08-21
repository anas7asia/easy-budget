import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BudgetSheet } from '../../interfaces/budget';

@Component({
  selector: 'app-budget-sheet',
  templateUrl: './budget-sheet.component.html',
  styleUrls: ['./budget-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSheetComponent implements OnInit {

  @Input() sheet: BudgetSheet

  constructor() { }

  ngOnInit(): void {
  }

}
