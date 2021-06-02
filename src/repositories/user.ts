import axios from 'axios';
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

export const findAll = async (): Promise<User[]> => {
  // TODO: ドメインを環境別に変更
  const endPoint = 'http://localhost:5000/v1/users/';
  const res = await axios.get<IndexResponse>(endPoint).then(({ data }) => data);

  return res.map((user) => toUserModel(user));
};

export const findById = async (id: number): Promise<User> => {
  const endPoint = 'http://localhost:5000/v1/users/' + id;
  const res = await axios.get<ShowResponse>(endPoint).then(({ data }) => data);

  return toUserModel(res);
};

export const update = async (user: UpdateUser): Promise<User> => {
  const endPoint = 'http://localhost:5000/v1/users/' + user.id;
  const payload: UpdateRequest = {
    name: user.name,
  };
  const res = await axios
    .put<UpdateResponse>(endPoint, payload)
    .then(({ data }) => data);

  return toUserModel(res);
};

export const create = async (user: CreateUser): Promise<User> => {
  const endPoint = 'http://localhost:5000/v1/users/';
  const payload: CreateRequest = {
    name: user.name,
  };
  const res = await axios
    .post<CreateResponse>(endPoint, payload)
    .then(({ data }) => data);

  return toUserModel(res);
};
