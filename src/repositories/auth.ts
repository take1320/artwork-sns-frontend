import {
  AccessTokenResponse,
  AccessTokenResponseType,
} from '@/repositories/types/api/auth';
import { IHttpClient } from '@/repositories/apis/httpClient';
import { inject, injectable } from 'tsyringe';
import { TOKEN } from '@/containerRegistry';
import { IAccessToken } from '@/entities/auth';

export interface IAuthRepository {
  fetchAccessToken(): Promise<IAccessToken>;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@inject(TOKEN.HttpClient) private httpClient: IHttpClient) {}

  async fetchAccessToken(): Promise<IAccessToken> {
    const url = 'http://local.api.artworksns.com:5000/auth/access-token';
    const res = await this.httpClient.get<AccessTokenResponse>(
      url,
      AccessTokenResponseType
    );

    return res;
  }
}
