import { Identifier } from '@/models/base';
import { UserValues } from '@/models/user';

export type CreateForm = UserValues;
export type UpdateForm = Identifier & UserValues;
