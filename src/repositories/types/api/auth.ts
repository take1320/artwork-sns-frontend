import * as t from 'io-ts';

export const AccessTokenResponseType = t.type({
  accessToken: t.string,
});
export type AccessTokenResponse = t.TypeOf<typeof AccessTokenResponseType>;
