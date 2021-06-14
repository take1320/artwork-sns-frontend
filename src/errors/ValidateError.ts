import { ValidationErrorItem } from '@/store/users/validator';

export class ValidationError extends Error {
  readonly errors: ValidationErrorItem[];

  constructor(errors: ValidationErrorItem[], message = 'ValidationError') {
    super(message);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}
