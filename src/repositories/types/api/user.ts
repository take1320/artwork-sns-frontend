import { User } from '@/repositories/types/api/model';
import { User as UserModel } from '@/models/user';
import dayjs from 'dayjs';

export type IndexResponse = User[];

export type ShowResponse = User;

export type UpdateRequest = {
  name: string;
};
export type UpdateResponse = User;

export type CreateRequest = {
  name: string;
};
export type CreateResponse = User;

export const toUserModel = (user: User): UserModel => ({
  id: user.id,
  name: user.name,
  createdAt: dayjs(user.created_at).toDate(),
  updatedAt: dayjs(user.updated_at).toDate(),
});
