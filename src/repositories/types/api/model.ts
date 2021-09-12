import * as t from 'io-ts';

export const IdentifierType = t.type({
  id: t.number,
});

export const RecordingDateType = t.type({
  createdAt: t.string,
  updatedAt: t.string,
});

export const UserValuesType = t.type({
  name: t.string,
});

// NOTE: t.intersection = A & B
export const CommonValuesType = t.intersection([
  IdentifierType,
  RecordingDateType,
]);

export const UserType = t.intersection([CommonValuesType, UserValuesType]);
export type User = t.TypeOf<typeof UserType>;
