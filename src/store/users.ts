import { ActionTree, Module, MutationTree } from 'vuex';
import { IUser } from '@/entities/user';
import axios from 'axios';
import { RootState } from '@/store/index';

interface State {
  list: IUser[];
  user: IUser | null;
}

const state: State = {
  list: [],
  user: null,
};

const actions: ActionTree<State, RootState> = {
  async fetchList({ commit }) {
    const { data } = await axios.get<IUser[]>(
      'http://localhost:5000/v1/users/'
    );
    commit('setList', data);
  },
  async fetchUser({ commit }, id: number) {
    const endPoint = 'http://localhost:5000/v1/users/' + id;
    const { data } = await axios.get<IUser>(endPoint);
    commit('setUser', data);
  },
  // async update({ commit }, user: IUser) {
  // const endPoint = 'http://localhost:5000/v1/users/' + id;
  // const { data } = await axios.get<IUser>(endPoint);
  // commit('setUser', data);
  // },
};

const mutations: MutationTree<State> = {
  setList(state, users: IUser[]) {
    state.list = users;
  },
  setUser(state, user: IUser) {
    state.user = user;
  },
};

export const users: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
