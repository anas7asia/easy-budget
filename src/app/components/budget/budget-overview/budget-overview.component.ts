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
  perMonth: string
  perYear: string

  ngOnChanges(changes: SimpleChanges) {
    if (changes.yearlyIncome || changes.yearlyExpenses) {
      this.chartCircles = this.createChartCircles()
      this.perMonth = this.calcNetIncome(this.monthlyIncome, this.monthlyExpenses)
      this.perYear = this.calcNetIncome(this.yearlyIncome, this.yearlyExpenses)
    }
  }
  
  private createChartCircles(): BudgetChartCircle[] {
    // greatest value represents 100% of chart circle
    const greatestValue = this.selectGreaterValue(this.yearlyIncome, this.yearlyExpenses)

    return [
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
  }

  private selectGreaterValue(v1: number, v2: number): number {
    return v1 > v2 ? v1 : v2
  }

  private calcNetIncome(income, expenses): string {
    const net = income - expenses
    return net > 0 ? `+${net}` : `${net}`
  }

}
