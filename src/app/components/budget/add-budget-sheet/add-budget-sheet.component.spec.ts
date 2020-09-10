import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddBudgetSheetComponent } from './add-budget-sheet.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('AddBudgetSheetComponent', () => {
  let component: AddBudgetSheetComponent;
  let fixture: ComponentFixture<AddBudgetSheetComponent>;

  beforeEach(async(() => {
    TestBed.overrideComponent(AddBudgetSheetComponent, { add: {
      changeDetection: ChangeDetectionStrategy.Default
    }});
    TestBed.configureTestingModule({
      declarations: [ AddBudgetSheetComponent ],
      imports: [ 
        ReactiveFormsModule,
        FormsModule 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the form when Add New Sheet button is pressed', () => {
    const addBtn = fixture.debugElement.query(By.css('#js-show-form'));
    addBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.isFormVisible = true;
    fixture.detectChanges();

    const submitFormSpy = spyOn(component, 'submitForm');
    
    const formSubmitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    formSubmitBtn.triggerEventHandler('click', null);

    expect(submitFormSpy).not.toHaveBeenCalled();
  });

  it('should raise the event if the form was filled correctly and then reset the form', () => {
    component.isFormVisible = true;
    fixture.detectChanges();
    
    let newSheetTitle;
    component.sheetAdded.subscribe(val => newSheetTitle = val);

    component.addSheetControl.setValue('Transport');
    
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    
    // raise the event
    expect(newSheetTitle).toBe('Transport');

    // reset the form
    expect(component.isFormVisible).toBe(false);
    expect(component.addSheetControl.value).toBe(null);
  });
  
});
