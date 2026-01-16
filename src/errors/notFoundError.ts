import { AppError } from './error.js';

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
