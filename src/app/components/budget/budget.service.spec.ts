import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { provideMockStore } from '@ngrx/store/testing';
import { MockBudgetState } from 'src/app/testing/mock-budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: MockBudgetState,
      })]
    });
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
