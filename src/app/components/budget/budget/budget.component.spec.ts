import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';

import { MockBudgetState } from 'src/app/testing/mock-budget';

import { BudgetComponent } from './budget.component';
import { BudgetSheetComponent } from '../budget-sheet/budget-sheet.component';
import { AddBudgetSheetComponent } from '../add-budget-sheet/add-budget-sheet.component';

describe('BudgetComponent', () => {
  let comp: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let mockStore: MockStore;
  // let mockSheetsSelector: MemoizedSelector<State, BudgetSheet[]>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BudgetComponent,
        MockComponent(AddBudgetSheetComponent),
        MockComponent(BudgetSheetComponent),
      ],
      providers: [provideMockStore({
        initialState: MockBudgetState,
      })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    mockStore = TestBed.inject(MockStore);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should calculate an id for a new sheet if there are already some sheets', () => {
    let result: number;
    comp.newSheetId$.subscribe(id => result = id);
    expect(result).toBe(MockBudgetState.sheets[MockBudgetState.sheets.length-1].id + 1);
  });

  /*
  This test would work if selectSheets selector were a MemoizedSelector as overrideSelector demands:

  export const selectSheets = createSelector((state: Budget) => state.sheets, (sheets) => sheets)

  it('should calculate an id for a new sheet if there is no sheets yet', () => {
    mockSheetsSelector = mockStore.overrideSelector(selectSheets, []);
    mockStore.refreshState();

    let result: number;
    comp.newSheetId$.subscribe(id => result = id);
    expect(result).toBe(0);
  }); 
  */
});
