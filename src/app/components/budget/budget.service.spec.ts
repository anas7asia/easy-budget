import { TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockBudgetState } from 'src/app/testing/mock-budget';
import { Colors } from 'src/app/constants';

import { BudgetService } from './budget.service';

const mockRawSheets = MockBudgetState.sheets.map(sheet => ({
  title: sheet.title,
  id: sheet.id,
  categoryId: sheet.categoryId,
  items: sheet.items
}));

describe('BudgetService', () => {
  let service: BudgetService;
  let mockStore: MockStore;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: MockBudgetState,
      })]
    });
    service = TestBed.inject(BudgetService);
    mockStore = TestBed.inject(MockStore);
    service.sheets = mockRawSheets;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add color to each sheet', () => {
    const result = service.parseRawSheetData(mockRawSheets[0]);
    expect(result.color).toBe(Colors[0]);
  });

  xit('should add a random color if not enough colors in Colors constant', () => {

  });

  it('should calculate yearly subtotal for each sheet', () => {
    const result = service.parseRawSheetData(mockRawSheets[0]);
    expect(result.yearlySubtotal).toBe(36000);
  });
  
  it('should calculate monthly subtotal for each sheet', () => {
    const result = service.parseRawSheetData(mockRawSheets[0]);
    expect(result.monthlySubtotal).toBe(3000);
  });
});
