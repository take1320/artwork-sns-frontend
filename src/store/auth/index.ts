import { ActionTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';
import 'reflect-metadata';
import { ACTION_TYPE, MUTATION_TYPE } from '@/store/auth/storeType';
import { container } from 'tsyringe';
import { IAccessToken } from '@/entities/auth';
import { AuthRepository, IAuthRepository } from '@/repositories/auth';
import Cookies from 'js-cookie';

interface State {
  accessToken: IAccessToken | null;
}

const state: State = {
  accessToken: null,
};

const authRepository: IAuthRepository = container.resolve(AuthRepository);

const actions: ActionTree<State, RootState> = {
  [ACTION_TYPE.INIT_ACCESS_TOKEN]: async ({ commit }) => {
    const token: string | undefined = Cookies.get('access-token');

    if (!token) {
      return;
    }

    const accessToken: IAccessToken = {
      accessToken: token,
    };
    commit(MUTATION_TYPE.SET_ACCESS_TOKEN, accessToken);
  },
  [ACTION_TYPE.FETCH_ACCESS_TOKEN]: async ({ commit }) => {
    const accessToken: IAccessToken = await authRepository.fetchAccessToken();
    commit(MUTATION_TYPE.SET_ACCESS_TOKEN, accessToken);
  },
};

const mutations: MutationTree<State> = {
  [MUTATION_TYPE.SET_ACCESS_TOKEN]: (state, accessToken: IAccessToken) => {
    state.accessToken = accessToken;
    Cookies.set('access-token', accessToken.accessToken);
  },
};

export const auth: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
