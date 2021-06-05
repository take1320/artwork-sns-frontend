import {
  CreateRequest,
  CreateResponse,
  IndexResponse,
  ShowResponse,
  toUserModel,
  UpdateRequest,
  UpdateResponse,
} from '@/repositories/types/api/user';
import { User, UpdateUser, CreateUser } from '@/models/user';
import { IHttpClient } from '@/repositories/apis/httpClient';
import { inject, injectable } from 'tsyringe';
import { TOKEN_NAME } from '@/containerRegistry';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(user: UpdateUser): Promise<User>;
  create(user: CreateUser): Promise<User>;
  deleteById(id: number): Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TOKEN_NAME.HttpClient) private httpClient: IHttpClient) {}

  async findAll(): Promise<User[]> {
    // TODO: ドメインを環境別に変更
    const endPoint = 'http://localhost:5000/v1/users/';
    const res = await this.httpClient.get<IndexResponse>(endPoint);
    return res.map((user) => toUserModel(user));
  }

  async findById(id: number): Promise<User> {
    const endPoint = 'http://localhost:5000/v1/users/' + id;
    const res = await this.httpClient.get<ShowResponse>(endPoint);

    return toUserModel(res);
  }

  async update(user: UpdateUser): Promise<User> {
    const endPoint = 'http://localhost:5000/v1/users/' + user.id;
    const payload: UpdateRequest = {
      name: user.name,
    };
    const res = await this.httpClient.put<UpdateResponse>(endPoint, payload);

    return toUserModel(res);
  }

  async create(user: CreateUser): Promise<User> {
    const endPoint = 'http://localhost:5000/v1/users/';
    const payload: CreateRequest = {
      name: user.name,
    };
    const res = await this.httpClient.put<CreateResponse>(endPoint, payload);

    return toUserModel(res);
  }

  async deleteById(id: number): Promise<void> {
    const endPoint = 'http://localhost:5000/v1/users/' + id;
    await this.httpClient.delete(endPoint);
  }
}
