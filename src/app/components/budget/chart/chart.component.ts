import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BudgetChartCircle, BudgetChartList } from 'src/app/interfaces/budget'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  @Input() circles: BudgetChartCircle[]
  @Input() list: BudgetChartList[]
  @Input() title: string
  @Input() perMonth: string
  @Input() perYear: string

}
