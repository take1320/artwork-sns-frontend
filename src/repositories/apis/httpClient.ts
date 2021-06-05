import axios from 'axios';
import { injectable } from 'tsyringe';

export interface IHttpClient {
  get<T>(endpoint: string): Promise<T>;
  put<T>(endpoint: string, payload: any): Promise<T>; // eslint-disable-line
  post<T>(endpoint: string, payload: any): Promise<T>; // eslint-disable-line
  delete<T>(endpoint: string): Promise<T>;
}

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(endpoint: string): Promise<T> {
    return axios.get<T>(endpoint).then(({ data }) => data);
  }

  // eslint-disable-next-line
  async put<T>(endpoint: string, payload: any): Promise<T> {
    return axios.put<T>(endpoint, payload).then(({ data }) => data);
  }

  // eslint-disable-next-line
  async post<T>(endpoint: string, payload: any): Promise<T> {
    return axios.post<T>(endpoint, payload).then(({ data }) => data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return axios.delete<T>(endpoint).then(({ data }) => data);
  }
}
