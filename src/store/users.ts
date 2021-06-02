import { ActionTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';
import * as UserRepository from '@/repositories/user';
import { CreateForm, UpdateForm } from '@/store/types/user';
import { CreateUser, UpdateUser, User } from '@/models/user';
import { ACTION_TYPE, MUTATION_TYPE } from '@/store/users/storeType';

interface State {
  users: User[];
  user: User | null;
}

const state: State = {
  users: [],
  user: null,
};

const actions: ActionTree<State, RootState> = {
  [ACTION_TYPE.FETCH_USERS]: async ({ commit }) => {
    const users = await UserRepository.findAll();
    commit(MUTATION_TYPE.SET_USERS, users);
  },
  [ACTION_TYPE.FETCH_USER]: async ({ commit }, id: number) => {
    const user = await UserRepository.findById(id);
    commit(MUTATION_TYPE.SET_USER, user);
  },
  [ACTION_TYPE.UPDATE_USER]: async (_, form: UpdateForm) => {
    const updateUser: UpdateUser = form;
    await UserRepository.update(updateUser);
  },
  [ACTION_TYPE.CREATE_USER]: async (_, form: CreateForm) => {
    const createUser: CreateUser = form;
    await UserRepository.create(createUser);
  },
};

const mutations: MutationTree<State> = {
  [MUTATION_TYPE.SET_USERS]: (state, users: User[]) => {
    state.users = users;
  },
  [MUTATION_TYPE.SET_USER]: (state, user: User) => {
    state.user = user;
  },
};

export const users: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
