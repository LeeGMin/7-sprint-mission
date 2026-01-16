import { AuthPayload } from './auth.type.ts';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload | undefined;
    }
  }
}

export {};
