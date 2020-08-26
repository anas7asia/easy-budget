import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const MonthlyYearlyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const monthly = control.get('monthly')
  const yearly = control.get('yearly')

  // either monthly or yearly field should be filled, if none is filled form becomes invalid
  return monthly.value || yearly.value ? null : { noMonthlyNorYearly: true }
}
