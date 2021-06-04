import { createStore } from 'vuex';
import { users } from '@/store/users';

export interface RootState {
  text: '';
}

const state: RootState = {
  text: '',
};

export default createStore<RootState>({
  state,
  modules: {
    users: users,
  },
});
