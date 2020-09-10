import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { MockComponent } from 'ng-mocks';

import { BudgetOverviewComponent } from './budget-overview.component';
import { ChartComponent } from '../chart/chart.component';

describe('BudgetOverviewComponent', () => {
  let component: BudgetOverviewComponent;
  let fixture: ComponentFixture<BudgetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BudgetOverviewComponent,
        MockComponent(ChartComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an array of circles', () => {
    component.chartWidth = 12;
    component.strokeWidth = 2;
    component.yearlyIncome = 1000;
    component.yearlyExpenses = 500;
    component.colors = { income: 'green', expenses: 'red' };
    
    component.ngOnChanges({
      yearlyIncome: new SimpleChange(undefined, 1000, true),
      yearlyExpenses: new SimpleChange(undefined, 500, true)
    });

    expect(component.chartCircles[0]).toEqual({
      color: "green",
      radius: 5,
      strokeDasharray: "31.415926535897928, 31.41592653589793",
      strokeDashoffset: "-0",
      strokeWidth: 2
    });

    expect(component.chartCircles[1]).toEqual({
      color: "red",
      radius: 3,
      strokeDasharray: "9.42477796076938, 18.84955592153876",
      strokeDashoffset: "-0",
      strokeWidth: 2
    })

  });
});
