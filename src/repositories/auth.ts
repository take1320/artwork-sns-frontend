import {
  AccessTokenResponse,
  AccessTokenResponseType,
  GetProfileResponse,
} from '@/repositories/types/api/auth';
import type { IHttpClient } from '@/repositories/apis/httpClient';
import { inject, injectable } from 'tsyringe';
import { TOKEN } from '@/containerRegistry';
import { IAccessToken, IProfile } from '@/entities/auth';
import { subdivideApiRequestError } from '@/errors/subdivideApiRequestError';

export interface IAuthRepository {
  fetchAccessToken(): Promise<IAccessToken>;
  fetchProfile(accessToken: IAccessToken): Promise<IProfile>;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@inject(TOKEN.HttpClient) private httpClient: IHttpClient) {}

  async fetchAccessToken(): Promise<IAccessToken> {
    const url = 'http://local.api.artworksns.com:5000/auth/access-token';
    const res = await this.httpClient.get<AccessTokenResponse>(url, {
      type: AccessTokenResponseType,
    });
    return res;
  }

  async fetchProfile(accessToken: IAccessToken): Promise<IProfile> {
    const url = 'http://local.api.artworksns.com:5000/auth/profile';
    const res = await this.httpClient
      .get<GetProfileResponse>(url, {
        accessToken: accessToken.accessToken,
      })
      .catch((err) => {
        throw subdivideApiRequestError(err);
      });
    return res;
  }
}
