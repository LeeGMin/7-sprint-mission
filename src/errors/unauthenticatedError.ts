import { AppError } from './error.js';

export class UnauthenticatedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
