import axios, { AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import { Type } from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { isLeft } from 'fp-ts/Either';
import { ApiRequestError } from '@/errors/ApiRequestError';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface IHttpClient {
  get<T>(endpoint: string, type?: Type<any>): Promise<T>;

  put<T>(endpoint: string, payload: any, type?: Type<any>): Promise<T>;

  post<T>(endpoint: string, payload: any, type?: Type<any>): Promise<T>;

  delete<T>(endpoint: string, type?: Type<any>): Promise<T>;
}

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(url: string, type?: Type<any>): Promise<T> {
    const res = await axios
      .get<T>(url, {
        withCredentials: true,
      })
      .then(({ data }) => data);
    if (type) this.validateResponse(type, res);
    return res;
  }

  async put<T>(url: string, data: any, type: Type<any>): Promise<T> {
    const res = await axios
      .put<T>(url, data)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        const errRes = error.response;
        if (!errRes) throw new Error('httpClient undefined response.');
        throw new ApiRequestError(errRes.status, errRes.data);
      });
    if (type) this.validateResponse(type, res);
    return res;
  }

  async post<T>(url: string, data: any, type: Type<any>): Promise<T> {
    const res = await axios
      .post<T>(url, data)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        const errRes = error.response;
        if (!errRes) throw new Error('httpClient undefined response.');
        throw new ApiRequestError(errRes.status, errRes.data);
      });
    if (type) this.validateResponse(type, res);
    return res;
  }

  async delete<T>(endpoint: string, type: Type<any>): Promise<T> {
    const res = await axios
      .delete<T>(endpoint)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        const errRes = error.response;
        if (!errRes) throw new Error('httpClient undefined response.');
        throw new ApiRequestError(errRes.status, errRes.data);
      });
    if (type) this.validateResponse(type, res);
    return res;
  }

  validateResponse(type: Type<any>, res: any): void {
    const result = type.decode(res);
    if (isLeft(result)) {
      throw new Error(JSON.stringify(PathReporter.report(result)));
    }
  }
}
