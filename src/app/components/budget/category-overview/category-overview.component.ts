import { Component, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { BudgetSheet, BudgetChartCircle, BudgetChartList } from 'src/app/interfaces/budget';
import { calcPercentage } from 'src/app/utils';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryOverviewComponent extends OverviewComponent implements OnChanges {

  @Input() sheets: BudgetSheet[]
  @Input() total: number
  @Input() yearly: number
  @Input() monthly: number
  @Input() prefix: string
  chartCircles: BudgetChartCircle[]
  chartList: BudgetChartList[]
  private offset: number = 0

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sheets) {
      this.offset = 0
      this.chartCircles = this.createChartCircles(this.sheets, this.total)
      this.chartList = this.createChartList(this.sheets)
    }
  }

  private createChartCircles(sheets: BudgetSheet[], total: number): BudgetChartCircle[] {
    return sheets.map(sheet => {
      const circle = this.createCircle(
        this.chartWidth, 
        this.strokeWidth, 
        calcPercentage(sheet.yearlySubtotal, total), 
        this.offset, 
        sheet.color)
      this.offset += +circle.strokeDasharray.split(',')[0] // next circle starts where previous circle arc ends
      return circle
    })
  }

  private createChartList(sheets: BudgetSheet[]): BudgetChartList[] {
    return sheets.map(sheet => ({
      color: sheet.color,
      title: `${sheet.title} - ${calcPercentage(sheet.yearlySubtotal, this.total)}%`
    }))
  }

}
