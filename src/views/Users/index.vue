<template>
  <div>
    <p>ユーザ一覧</p>
    <input type="button" value="fetchUser!" />
    <template v-for="user in users" :key="user.id">
      <div>
        <p>{{ user.name }}</p>
        <router-link
          :to="{ name: pageName.UserDetail, params: { id: user.id } }"
        >
          {{ user.id }}
        </router-link>
      </div>
    </template>
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { RouterView, RouterLink } from 'vue-router';
import { IUser } from '@/entities/user';
import { pageName } from '@/router/index';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';

export default defineComponent({
  components: {
    RouterView,
    RouterLink,
  },
  setup() {
    const store = useStore();

    const init = () => {
      store.dispatch(USERS_ACTION_TYPE.FETCH_USERS);
    };

    onMounted(() => {
      console.log('onMounted');
      init();
    });

    const users = computed((): IUser[] => {
      return store.state.users.users;
    });

    return {
      users,
      pageName,
    };
  },
});
</script>
