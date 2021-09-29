import { createStore } from 'vuex';
import { users } from '@/store/users';
import { auth } from '@/store/auth';

export interface RootState {
  text: '';
}

const state: RootState = {
  text: '',
};

export default createStore<RootState>({
  state,
  modules: {
    users,
    auth,
  },
});
