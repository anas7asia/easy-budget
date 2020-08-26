import { budgetSheetReducer } from './budget-sheet.reducers';
import { addSheet, updateSheet, deleteSheet } from './budget-sheet.actions';
import { MockBudgetState, MockBudgetSheet } from 'src/app/testing/mock-budget';

describe('Budget Sheet Reducers', () => {
  it('should add a new sheet', () => {
    const initialState = MockBudgetState.sheets;
    const result = budgetSheetReducer(initialState, addSheet({sheet: MockBudgetSheet }))
    /*
    check that there's one more sheet in the store 
    and its title is the same as the last added sheet's title
    */
    expect(result.length).toBe(MockBudgetState.sheets.length + 1);
    expect(result[result.length-1].title).toBe(MockBudgetSheet.title);
  });

  it('should update a certain sheet', () => {
    const initialState = MockBudgetState.sheets;
    
    /*
    make sure new sheet id exists in the store
    here new item gets an id of the last sheet present in initial state
    */ 
    const newSheet = Object.assign(
      {},
      MockBudgetSheet,
      { id: initialState[initialState.length - 1].id })
      
    const result = budgetSheetReducer(initialState, updateSheet({sheet: newSheet }))
    expect(result[result.length-1].title).toBe(newSheet.title);
  });

  it('should delete a certain sheet', () => {
    const initialState = MockBudgetState.sheets;
    const sheetToDelete = MockBudgetState.sheets[0];

    /* check the first sheet in the array of sheets is no more there */
    const result = budgetSheetReducer(initialState, deleteSheet({sheet: sheetToDelete}));
    expect(result[0]).not.toBe(sheetToDelete);
  });
});