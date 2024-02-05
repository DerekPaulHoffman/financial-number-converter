import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  inputValue: string = '';
  errorMessage: string = '';
  multipliers = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
  };

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = this.isValidInput(this.inputValue)
      ? ''
      : 'Invalid input format. Please enter a number in formats like 250k, 10m, or .5b.';

    if (!this.errorMessage) {
      const fullNumber = this.convertToFullNumber(this.inputValue);
      this.router.navigate(['/output', fullNumber]);
    }
  }

  private regexPattern = new RegExp(
    `^[0-9]*\\.?[0-9]+(${Object.keys(this.multipliers).join('|')})$`
  );

  public isValidInput(value: string): boolean {
    return this.regexPattern.test(value);
  }

  public convertToFullNumber(value: string): string {
    const unit = value.charAt(value.length - 1);
    const number = parseFloat(value.substring(0, value.length - 1));
    const multiplier = this.multipliers[unit as keyof typeof this.multipliers];

    if (multiplier !== undefined) {
      return (number * multiplier).toLocaleString('en-US');
    } else {
      return number.toLocaleString('en-US');
    }
  }
}
