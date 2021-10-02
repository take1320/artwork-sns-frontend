/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { injectable } from 'tsyringe';
import { Type } from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { isLeft } from 'fp-ts/Either';
import { ApiRequestError } from '@/errors/ApiRequestError';

type IRequestConfig = {
  type?: Type<any>;
  accessToken?: string;
};

export interface IHttpClient {
  get<T>(url: string, config?: IRequestConfig): Promise<T>;

  put<T>(url: string, data: any, config?: IRequestConfig): Promise<T>;

  post<T>(url: string, data: any, config?: IRequestConfig): Promise<T>;

  delete<T>(url: string, config?: IRequestConfig): Promise<T>;
}

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(url: string, config?: IRequestConfig): Promise<T> {
    const headers = this.makeHeaders(config);
    const res = await axios
      .get<T>(url, {
        withCredentials: true,
        headers,
      })
      .then(({ data }) => data)
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new ApiRequestError(err.response.status, err.response.data);
        } else {
          throw err;
        }
      });
    if (config?.type) this.validateResponse(config.type, res);
    return res;
  }

  async put<T>(url: string, data: any, config: IRequestConfig): Promise<T> {
    const headers = this.makeHeaders(config);
    const res = await axios
      .put<T>(url, data, {
        headers,
      })
      .then(({ data }) => data)
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new ApiRequestError(err.response.status, err.response.data);
        } else {
          throw err;
        }
      });
    if (config?.type) this.validateResponse(config.type, res);
    return res;
  }

  async post<T>(url: string, data: any, config?: IRequestConfig): Promise<T> {
    const headers = this.makeHeaders(config);
    const res = await axios
      .post<T>(url, data, {
        headers,
      })
      .then(({ data }) => data)
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new ApiRequestError(err.response.status, err.response.data);
        } else {
          throw err;
        }
      });
    if (config?.type) this.validateResponse(config.type, res);
    return res;
  }

  async delete<T>(url: string, config?: IRequestConfig): Promise<T> {
    const headers = this.makeHeaders(config);
    const res = await axios
      .delete<T>(url, {
        headers,
      })
      .then(({ data }) => data)
      .catch((err: AxiosError) => {
        if (err.response) {
          throw new ApiRequestError(err.response.status, err.response.data);
        } else {
          throw err;
        }
      });
    if (config?.type) this.validateResponse(config.type, res);
    return res;
  }

  validateResponse(type: Type<any>, res: any): void {
    const result = type.decode(res);
    if (isLeft(result)) {
      throw new Error(JSON.stringify(PathReporter.report(result)));
    }
  }

  makeHeaders(
    config: IRequestConfig | undefined
  ): AxiosRequestConfig['headers'] {
    return config?.accessToken
      ? {
          Authorization: `Bearer ${config.accessToken}`,
        }
      : {};
  }
}
