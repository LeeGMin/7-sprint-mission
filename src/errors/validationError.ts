import { AppError } from './error.js';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
