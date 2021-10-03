<template>
  <div>
    <p>ユーザ一覧</p>
    <input type="button" value="fetchUser!" />
    <template v-for="user in users" :key="user.id">
      <div>
        <p>{{ user.name }}</p>
        <router-link
          :to="{ name: pathName.UserDetail, params: { id: user.id } }"
        >
          {{ user.id }}
        </router-link>
      </div>
    </template>
    <router-view />
    <create-form />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { RouterView, RouterLink, onBeforeRouteUpdate } from 'vue-router';
import { pathName } from '@/router/index';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';
import CreateForm from '@/components/pages/Users/Create.vue';
import { useStore } from '@/store';
import { User } from '@/models/user';

export default defineComponent({
  components: {
    RouterView,
    RouterLink,
    CreateForm,
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

    onBeforeRouteUpdate((to, from, next) => {
      init();
      next();
    });

    const users = computed((): User[] => {
      return store.state.users.users;
    });

    return {
      users,
      pathName,
    };
  },
});
</script>
