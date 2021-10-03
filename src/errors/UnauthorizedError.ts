/* eslint-disable @typescript-eslint/no-explicit-any */
export class UnauthorizedError extends Error {
  constructor(message = 'UnauthorizedError') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
