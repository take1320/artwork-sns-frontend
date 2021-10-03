import { ApiRequestError } from './ApiRequestError';
import { UnauthorizedError } from './UnauthorizedError';

const STATUS = {
  UNAUTHORIZED: 401,
} as const;

export const subdivideApiRequestError = (err: Error): Error => {
  if (!(err instanceof ApiRequestError)) {
    return err;
  }

  switch (err.status) {
    case STATUS.UNAUTHORIZED:
      return new UnauthorizedError(err.message);
    default:
      return err;
  }
};
