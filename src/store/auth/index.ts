import { ActionTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';
import 'reflect-metadata';
import { ACTION_TYPE, MUTATION_TYPE } from '@/store/auth/storeType';
import { container } from 'tsyringe';
import { IAccessToken, IProfile } from '@/entities/auth';
import { AuthRepository, IAuthRepository } from '@/repositories/auth';
import Cookies from 'js-cookie';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

export interface IState {
  accessToken: IAccessToken | null;
  profile: IProfile | null;
}

export const state: IState = {
  accessToken: null,
  profile: null,
};

const authRepository: IAuthRepository = container.resolve(AuthRepository);

const actions: ActionTree<IState, RootState> = {
  // ストアの初期化
  [ACTION_TYPE.INIT]: async ({ state, dispatch }) => {
    await dispatch(ACTION_TYPE.INIT_ACCESS_TOKEN);
    if (!state.accessToken) {
      return;
    }
    await dispatch(ACTION_TYPE.FETCH_PROFILE);
  },

  // アクセストークンをcookieからストアに読み込む
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

  // プロフィール（=ログインユーザ）を取得
  [ACTION_TYPE.FETCH_PROFILE]: async ({ commit, state }) => {
    if (!state.accessToken) {
      throw new Error('accessToken is null');
    }

    try {
      const profile: IProfile = await authRepository.fetchProfile(
        state.accessToken
      );
      commit(MUTATION_TYPE.SET_PROFILE, profile);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        // TODO: 画面に認証失敗を表示する？
        console.log('アクセストークンを削除');
        commit(MUTATION_TYPE.SET_ACCESS_TOKEN, null);
      } else {
        throw err;
      }
    }
  },

  // アクセストークン取得
  [ACTION_TYPE.FETCH_ACCESS_TOKEN]: async ({ commit }) => {
    const accessToken: IAccessToken = await authRepository.fetchAccessToken();
    commit(MUTATION_TYPE.SET_ACCESS_TOKEN, accessToken);
  },
};

const mutations: MutationTree<IState> = {
  // stateと同じ状態をcookieに保存し、復元できるようにする
  [MUTATION_TYPE.SET_ACCESS_TOKEN]: (
    state,
    accessToken: IState['accessToken']
  ) => {
    state.accessToken = accessToken;
    Cookies.set('access-token', accessToken?.accessToken ?? '');
  },

  [MUTATION_TYPE.SET_PROFILE]: (state, profile: IProfile) => {
    state.profile = profile;
  },
};

export const module: Module<IState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
