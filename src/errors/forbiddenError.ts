import { AppError } from './error.js';

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}
