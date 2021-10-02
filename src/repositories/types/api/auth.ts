import { IProfile } from '@/entities/auth';
import * as t from 'io-ts';

export const AccessTokenResponseType = t.type({
  accessToken: t.string,
});
export type AccessTokenResponse = t.TypeOf<typeof AccessTokenResponseType>;

// NOTE: io-ts は廃止予定（メリットより手間が多い。OAS定義から生成した型に代替予定）
export type GetProfileResponse = IProfile;
