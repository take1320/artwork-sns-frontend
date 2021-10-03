const MODULE_NAME = 'auth';

export const ACTION_TYPE = {
  INIT: 'INIT',
  FETCH_PROFILE: 'FETCH_PROFILE',
  INIT_ACCESS_TOKEN: 'INIT_ACCESS_TOKEN',
  FETCH_ACCESS_TOKEN: 'FETCH_ACCESS_TOKEN',
  DISCARD_ACCESS_TOKEN: 'DISCARD_ACCESS_TOKEN',
} as const;

export const MUTATION_TYPE = {
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_PROFILE: 'SET_PROFILE',
} as const;

export const AUTH_ACTION_TYPE = {
  INIT: MODULE_NAME + '/' + ACTION_TYPE.INIT,
  FETCH_PROFILE: MODULE_NAME + '/' + ACTION_TYPE.FETCH_PROFILE,
  INIT_ACCESS_TOKEN: MODULE_NAME + '/' + ACTION_TYPE.INIT_ACCESS_TOKEN,
  FETCH_ACCESS_TOKEN: MODULE_NAME + '/' + ACTION_TYPE.FETCH_ACCESS_TOKEN,
  DISCARD_ACCESS_TOKEN: MODULE_NAME + '/' + ACTION_TYPE.DISCARD_ACCESS_TOKEN,
} as const;

export const AUTH_MUTATION_TYPE = {
  SET_ACCESS_TOKEN: MODULE_NAME + '/' + MUTATION_TYPE.SET_ACCESS_TOKEN,
  SET_PROFILE: MODULE_NAME + '/' + MUTATION_TYPE.SET_PROFILE,
} as const;
