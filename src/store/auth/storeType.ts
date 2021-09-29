const MODULE_NAME = 'auth';

export const ACTION_TYPE = {
  FETCH_ACCESS_TOKEN: 'FETCH_ACCESS_TOKEN',
};

export const MUTATION_TYPE = {
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
};

export const AUTH_ACTION_TYPE = {
  FETCH_ACCESS_TOKEN: MODULE_NAME + '/' + ACTION_TYPE.FETCH_ACCESS_TOKEN,
};

export const AUTH_MUTATION_TYPE = {
  SET_ACCESS_TOKEN: MODULE_NAME + '/' + MUTATION_TYPE.SET_ACCESS_TOKEN,
};
