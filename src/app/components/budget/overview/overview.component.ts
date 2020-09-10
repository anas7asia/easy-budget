import { Component } from '@angular/core';
import { BudgetChartCircle } from 'src/app/interfaces/budget';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  chartWidth: number = 100
  strokeWidth: number = 12

  /**
   * @desc 
   */
  protected createCircle(
    svgWidth: number, 
    strokeWidth: number, 
    percentage: number = 0, 
    offset: number = 0, 
    color: string): BudgetChartCircle {

    const radius: number = this.calcInnerRadius(svgWidth, strokeWidth)
    const circumference: number = this.calcCircumference(radius)

    /* arc is a part of circle circumference */
    const arcLength: number = this.calcArcLength(percentage, circumference)

    /* 
    This dash-array consists of a visible part (a dash / an arc) and following empty space. 
    First argument is the length a the arc. 
    To achieve to have empty space after second argument should be equal of greater than circumference minus arc length. For simplicity we take just circumference because it is obviously always greater.
    */
    const strokeDasharray: string = `${arcLength}, ${circumference}`

    /* 
    Offset is needed to create a donat chart where one final circle consists of several parts (ex. app-category-overview).
    Next circle arc starts where previous one ends.
    Positive value make arcs go counterclocwise, so negative value is used to implement chart design
    */  
    const strokeDashoffset = `-${offset}`

    return { radius, strokeWidth, strokeDasharray, strokeDashoffset, color }
  }

  /**
   * @desc svg circle total width comprises its inner width plus stroke width (something like content-box in css where border isn't taken in account to calculate element width)
   */
  private calcInnerRadius(circleWidth: number, circleStroke: number): number {
    return (circleWidth - circleStroke) / 2
  }

  private calcCircumference(radius: number): number {
    return radius * (2 * Math.PI)
  }

  private calcArcLength(percentage: number, circumference: number): number {
    return percentage * circumference / 100
  }
}
