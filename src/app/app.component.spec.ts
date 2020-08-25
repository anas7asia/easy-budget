import { TestBed, async } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { BudgetComponent } from './components/budget/budget.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(BudgetComponent)
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
