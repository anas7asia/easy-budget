import { Component, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { BudgetChartCircle, BudgetChartList } from 'src/app/interfaces/budget';
import { OverviewComponent } from '../overview/overview.component';
import { calcPercentage } from 'src/app/utils';
import { BudgetOverviewColors } from 'src/app/constants';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetOverviewComponent extends OverviewComponent implements OnChanges {
  
  @Input() yearlyIncome: number
  @Input() monthlyIncome: number
  @Input() yearlyExpenses: number
  @Input() monthlyExpenses: number
  chartCircles: BudgetChartCircle[]
  colors = BudgetOverviewColors
  chartList: BudgetChartList[] = [
    { title: 'Income', color: this.colors.income },
    { title: 'Outcome', color: this.colors.expenses },
  ]
  innerCirclesNb: number = 2
  strokeWidth = this.strokeWidth / this.innerCirclesNb // innerCirclesNb times thinner than the default value set in parent cmpnt

  ngOnChanges(changes: SimpleChanges) {
    if (changes.yearlyIncome || changes.yearlyExpenses) {

      // greatest value represents 100% of chart circle
      const greatestValue = this.selectGreaterValue(this.yearlyIncome, this.yearlyExpenses)

      this.chartCircles = [
        // income
        this.createCircle(
          this.chartWidth, // outer circle
          this.strokeWidth, 
          calcPercentage(this.yearlyIncome, greatestValue),
          0,
          this.colors.income
        ),
        // expenses
        this.createCircle(
          this.chartWidth - this.strokeWidth * this.innerCirclesNb, // inner circle
          this.strokeWidth,
          calcPercentage(this.yearlyExpenses, greatestValue),
          0,
          this.colors.expenses
        )
      ]
      console.log(this.chartCircles)
    }
  }

  private selectGreaterValue(v1: number, v2: number): number {
    return v1 > v2 ? v1 : v2
  }

}
