const MODULE_NAME = 'users';

// export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];

export const ACTION_TYPE = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  UPDATE_USER: 'UPDATE_USER',
  CREATE_USER: 'CREATE_USER',
};

export const USERS_ACTION_TYPE = {
  FETCH_USERS: MODULE_NAME + '/' + ACTION_TYPE.FETCH_USERS,
  FETCH_USER: MODULE_NAME + '/' + ACTION_TYPE.FETCH_USER,
  UPDATE_USER: MODULE_NAME + '/' + ACTION_TYPE.UPDATE_USER,
  CREATE_USER: MODULE_NAME + '/' + ACTION_TYPE.CREATE_USER,
};

export const MUTATION_TYPE = {
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
};

export const MODULE_MUTATION_TYPE = {
  SET_USERS: MODULE_NAME + '/' + MUTATION_TYPE.SET_USERS,
  SET_USER: MODULE_NAME + '/' + MUTATION_TYPE.SET_USER,
};
