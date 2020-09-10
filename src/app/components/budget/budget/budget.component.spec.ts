import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';

import { MockBudgetState } from 'src/app/testing/mock-budget';

import { BudgetComponent } from './budget.component';
import { BudgetSheetComponent } from '../budget-sheet/budget-sheet.component';
import { AddBudgetSheetComponent } from '../add-budget-sheet/add-budget-sheet.component';
import { CategoryOverviewComponent } from '../category-overview/category-overview.component';
import { BudgetService } from '../budget.service';
import { of } from 'rxjs';

describe('BudgetComponent', () => {
  let comp: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let mockStore: MockStore;
  let budgetService

  beforeEach(async(() => {
    const budgetServiceSpy = jasmine.createSpyObj('BudgetService', ['addSheet', 'loadSheets']);

    TestBed.configureTestingModule({
      declarations: [ 
        BudgetComponent,
        MockComponent(AddBudgetSheetComponent),
        MockComponent(BudgetSheetComponent),
        MockComponent(CategoryOverviewComponent),
      ],
      providers: [
        provideMockStore({
          initialState: MockBudgetState,
        }),
        { provide: BudgetService, useValue: budgetServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    mockStore = TestBed.inject(MockStore);
    comp = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should add a new sheet with a proper id if there are no sheets yet', () => {
    comp.allSheets$ = of([]);
    comp.addNewSheet('Transport', 0);
    expect(budgetService.addSheet).toHaveBeenCalledWith({
      title: 'Transport',
      categoryId: 0,
      id: 0
    });
  })

  it('should add a new sheet with a proper id if there are already some sheets', () => {
    comp.addNewSheet('Transport', 0);
    expect(budgetService.addSheet).toHaveBeenCalledWith({
      title: 'Transport',
      categoryId: 0,
      id: MockBudgetState.sheets[MockBudgetState.sheets.length-1].id + 1
    });
  });
});
