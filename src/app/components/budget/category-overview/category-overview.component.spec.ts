import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { MockBudgetState } from 'src/app/testing/mock-budget';

import { CategoryOverviewComponent } from './category-overview.component';
import { ChartComponent } from '../chart/chart.component';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('BudgetOverviewComponent', () => {
  let comp: CategoryOverviewComponent;
  let fixture: ComponentFixture<CategoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CategoryOverviewComponent,
        MockComponent(ChartComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOverviewComponent);
    comp = fixture.componentInstance;
    comp.sheets = MockBudgetState.sheets;
    comp.total = 37320;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should create a list of categories', () => {
    const changesObj: SimpleChanges = {
      sheets: new SimpleChange(undefined, MockBudgetState.sheets, true)
    };    
    comp.ngOnChanges(changesObj);
    
    fixture.detectChanges();
    expect(comp.chartList.length).toBe(MockBudgetState.sheets.length);
    expect(comp.chartList[0]).toEqual({ color: MockBudgetState.sheets[0].color, title: 'Salary - 96.46%'});
  });
  
  it('should create chart circles', () => {
    const testSheets = [
      { id: 0,  categoryId: 0, title: 'A', items: [], yearlySubtotal: 500, monthlySubtotal: 500/12, color: 'yellow'  },
      { id: 1, categoryId: 0, title: 'B', items: [], yearlySubtotal: 500, monthlySubtotal: 500/12, color: 'red'  },
    ];
    comp.strokeWidth = 2;
    comp.chartWidth = 12;
    comp.sheets = testSheets;
    comp.total = 1000;

    fixture.detectChanges();

    comp.ngOnChanges({
      sheets: new SimpleChange(undefined, testSheets, true),
      total: new SimpleChange(undefined, 1000, true)
    });

    expect(comp.chartCircles[0]).toEqual({
      radius: 5,
      strokeWidth: 2,
      strokeDasharray: "15.707963267948964, 31.41592653589793",
      strokeDashoffset: "-0",
      color: "yellow"
    });

    expect(comp.chartCircles[1]).toEqual({
      radius: 5,
      strokeWidth: 2,
      strokeDasharray: "15.707963267948964, 31.41592653589793",
      strokeDashoffset: "-15.707963267948964",
      color: "red"
    })
  });

});
