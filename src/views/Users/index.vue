<template>
  <div>
    <p>ユーザ一覧</p>
    <input type="button" @click="onClickFetchList" value="fetchUser!" />
    <template v-for="user in users" :key="user.id">
      <div>
        <p>{{ user.name }}</p>
        <router-link :to="{ name: 'UserDetail', params: { id: user.id } }">{{
          user.id
        }}</router-link>
      </div>
    </template>
    <router-view name="UserDetail"></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { RouterView } from 'vue-router';
import { IUser } from '@/entities/user';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    RouterView,
    RouterLink,
  },
  setup() {
    const store = useStore();

    const users = computed((): IUser[] => {
      return store.state.users.list;
    });

    const onClickFetchList = () => {
      store.dispatch('users/fetchList');
    };

    return {
      users,
      onClickFetchList,
    };
  },
});
</script>
