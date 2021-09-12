import * as t from 'io-ts';
import { UserType, UserValuesType, User } from '@/repositories/types/api/model';
import { User as UserModel } from '@/models/user';
import dayjs from 'dayjs';

export const IndexResponseType = t.array(UserType);
export type IndexResponse = t.TypeOf<typeof IndexResponseType>;

export const ShowResponseType = UserType;
export type ShowResponse = t.TypeOf<typeof ShowResponseType>;

export type UpdateRequest = t.TypeOf<typeof UserValuesType>;
export const UpdateResponseType = UserType;
export type UpdateResponse = t.TypeOf<typeof UpdateResponseType>;

export type CreateRequest = t.TypeOf<typeof UserValuesType>;
export const CreateResponseType = UserType;
export type CreateResponse = t.TypeOf<typeof CreateResponseType>;

export const toUserModel = (user: User): UserModel => ({
  id: user.id,
  name: user.name,
  createdAt: dayjs(user.createdAt).toDate(),
  updatedAt: dayjs(user.updatedAt).toDate(),
});
