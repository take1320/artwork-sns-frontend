import { IEntity } from '@/entities/base';

export interface IUser extends IEntity {
  id: number;
  name: string;
}

export interface ITwitterAccount extends IEntity {
  readonly id: number;
  readonly userId: number;
  readonly twitterId: string;
  readonly screenName: string;
  readonly iconUrl?: string;
}

export interface IUserWithTwitterAccount extends IUser {
  twitterAccount: ITwitterAccount;
}
