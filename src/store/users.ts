import { ActionTree, Module, MutationTree } from 'vuex';
import { IUser } from '@/entities/user';
import axios from 'axios';
import { RootState } from '@/store/index';

interface State {
  list: IUser[];
  show: IUser | null;
}

const state: State = {
  list: [],
  show: null,
};

const actions: ActionTree<State, RootState> = {
  async fetchList({ commit }) {
    const { data } = await axios.get<IUser[]>(
      'http://localhost:5000/v1/users/'
    );
    commit('fetchList', data);
  },
  async fetchOne({ commit }, id: number) {
    const { data } = await axios.get<IUser>(
      'http://localhost:5000/v1/users/' + id
    );
    commit('fetchOne', data);
  },
};

const mutations: MutationTree<State> = {
  fetchList(state, users: IUser[]) {
    state.list = users;
  },
  fetchOne(state, user: IUser) {
    state.show = user;
  },
};

export const users: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
