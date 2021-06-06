import {
  CreateRequest,
  CreateResponse,
  IndexResponse,
  ShowResponse,
  ShowResponseType,
  toUserModel,
  UpdateRequest,
  UpdateResponse,
} from '@/repositories/types/api/user';
import { User, UpdateUser, CreateUser } from '@/models/user';
import { IHttpClient } from '@/repositories/apis/httpClient';
import { inject, injectable } from 'tsyringe';
import { TOKEN } from '@/containerRegistry';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(user: UpdateUser): Promise<User>;
  create(user: CreateUser): Promise<User>;
  deleteById(id: number): Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TOKEN.HttpClient) private httpClient: IHttpClient) {}

  async findAll(): Promise<User[]> {
    // TODO: ドメインを環境別に変更
    const url = 'http://localhost:5000/v1/users/';
    const res = await this.httpClient.get<IndexResponse>(url);
    return res.map((user) => toUserModel(user));
  }

  async findById(id: number): Promise<User> {
    const url = 'http://localhost:5000/v1/users/' + id;
    const res = await this.httpClient.getWithType<ShowResponse>(
      ShowResponseType,
      url
    );

    return toUserModel(res);
  }

  async update(user: UpdateUser): Promise<User> {
    const url = 'http://localhost:5000/v1/users/' + user.id;
    const data: UpdateRequest = {
      name: user.name,
    };
    const res = await this.httpClient.put<UpdateResponse>(url, data);

    return toUserModel(res);
  }

  async create(user: CreateUser): Promise<User> {
    const url = 'http://localhost:5000/v1/users/';
    const data: CreateRequest = {
      name: user.name,
    };
    const res = await this.httpClient.put<CreateResponse>(url, data);

    return toUserModel(res);
  }

  async deleteById(id: number): Promise<void> {
    const url = 'http://localhost:5000/v1/users/' + id;
    await this.httpClient.delete(url);
  }
}
