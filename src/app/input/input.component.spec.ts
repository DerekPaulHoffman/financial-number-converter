import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for isValidInput method
  describe('isValidInput', () => {
    it('should return true for valid input', () => {
      const validInputs = ['250k', '10m', '.5b'];
      validInputs.forEach((input) => {
        expect(component.isValidInput(input)).toBeTruthy();
      });
    });

    it('should return false for invalid input', () => {
      const invalidInputs = ['250', 'abc', '1000mb'];
      invalidInputs.forEach((input) => {
        expect(component.isValidInput(input)).toBeFalsy();
      });
    });
  });

  describe('convertToFullNumber', () => {
    it('should correctly convert input to full number', () => {
      expect(component.convertToFullNumber('250k')).toEqual('250,000');
      expect(component.convertToFullNumber('10m')).toEqual('10,000,000');
      expect(component.convertToFullNumber('.5b')).toEqual('500,000,000');
    });
  });

  // Test for error message handling in onSubmit
  describe('onSubmit', () => {
    it('should set error message for invalid input', () => {
      component.inputValue = 'invalid';
      component.onSubmit();
      expect(component.errorMessage).toEqual(
        'Invalid input format. Please enter a number in formats like 250k, 10m, or .5b.'
      );
    });

    it('should clear error message for valid input', () => {
      component.inputValue = '250k';
      component.onSubmit();
      expect(component.errorMessage).toEqual('');
    });
  });
});
