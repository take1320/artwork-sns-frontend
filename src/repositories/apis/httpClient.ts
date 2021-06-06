import axios from 'axios';
import { injectable } from 'tsyringe';
import { Type } from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface IHttpClient {
  get<T>(endpoint: string): Promise<T>;
  getWithType<T>(type: Type<any>, endpoint: string): Promise<T>;
  put<T>(endpoint: string, payload: any): Promise<T>;
  post<T>(endpoint: string, payload: any): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    return axios.get<T>(url).then(({ data }) => data);
  }

  // TODO: 全てのメソッドをvalidation対応した後、削除する
  async getWithType<T>(type: Type<any>, url: string): Promise<T> {
    const res: T = await axios.get<T>(url).then(({ data }) => data);
    const validationResult = type.decode(res);
    console.log(PathReporter.report(validationResult));
    return res;
  }

  async put<T>(url: string, data: any): Promise<T> {
    return axios.put<T>(url, data).then(({ data }) => data);
  }

  async post<T>(url: string, data: any): Promise<T> {
    return axios.post<T>(url, data).then(({ data }) => data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return axios.delete<T>(endpoint).then(({ data }) => data);
  }
}
