import { IEntity } from '@/entities/base';

export interface IUser extends IEntity {
  id: number;
  name: string;
}
