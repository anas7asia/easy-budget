import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { MockBudgetState } from '../../testing/mock-budget'
import { BudgetSheetComponent } from './budget-sheet.component';

describe('BudgetSheetComponent', () => {
  let component: BudgetSheetComponent;
  let fixture: ComponentFixture<BudgetSheetComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(BudgetSheetComponent, { add: {
      changeDetection: ChangeDetectionStrategy.Default
    }});
    TestBed.configureTestingModule({
      declarations: [ BudgetSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSheetComponent);
    component = fixture.componentInstance;
    component.sheet = MockBudgetState.sheets[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate monthly subtotal', () => {
    const subtotal = fixture.nativeElement.querySelector('#js-monthly-subtotal');
    expect(subtotal.textContent).toContain(3000);
  });

  it('should calculate yearly subtotal', () => {
    const subtotal = fixture.nativeElement.querySelector('#js-yearly-subtotal');
    expect(subtotal.textContent).toContain(36000);
  });
});
