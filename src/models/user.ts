import { CommonValues, Identifier } from '@/models/base';

// 型Tの内、型Kと重複する項目のみPartialとする
// type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type UserValues = {
  name: string;
};

export type User = UserValues & CommonValues;

// MEMO: CreateUser や UpdateUser という型の命名は違和感
// MEMO: これくらいの粒度は利用する関数側に定義したほうが良いかも
export type CreateUser = UserValues;
export type UpdateUser = Identifier & UserValues;
