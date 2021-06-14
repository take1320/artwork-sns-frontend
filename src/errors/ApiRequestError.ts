/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    readonly errors: any[],
    message = 'ApiRequestError'
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiRequestError';
  }
}
