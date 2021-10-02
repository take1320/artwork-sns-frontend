import { createStore, Store, useStore as baseUseStore } from 'vuex';
import * as usersStore from '@/store/users';
import * as authStore from '@/store/auth';
import { InjectionKey } from 'vue';

export interface RootState {
  auth: authStore.IState;
  users: usersStore.IState;
}

const state: RootState = {
  auth: authStore.state,
  users: usersStore.state,
};

export default createStore<RootState>({
  state,
  modules: {
    auth: authStore.module,
    users: usersStore.module,
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};
