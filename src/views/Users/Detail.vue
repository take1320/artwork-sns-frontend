<template>
  <div style="background: yellow">
    <p>詳細 {{ id }}</p>
    <template v-if="!user">
      <p>読込中</p>
    </template>
    <template v-else>
      <p>{{ user.id }}</p>
      <p>{{ user.name }}</p>
      <router-link :to="{ name: pageName.UserEdit, params: { id: user.id } }">
        編集する
      </router-link>
      <router-view />
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/entities/user';
import { onBeforeRouteUpdate, RouterView } from 'vue-router';
import { pageName } from '@/router';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';

export default defineComponent({
  components: {
    RouterView,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const init = (id: number) => {
      store.dispatch(USERS_ACTION_TYPE.FETCH_USER, id);
    };

    onBeforeMount(() => {
      console.log('onBeforeMount');
    });

    onMounted(() => {
      console.log('onMounted');
      init(props.id);
    });

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    });

    onUpdated(() => {
      console.log('onUpdated');
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    });

    onUnmounted(() => {
      console.log('onUnmounted');
    });

    onBeforeRouteUpdate((to, from, next) => {
      console.log('onBeforeRouteUpdate');
      init(Number(to.params.id));
      next();
    });

    const user = computed((): IUser | null => {
      return store.state.users.user;
    });

    return {
      pageName,
      user,
    };
  },
});
</script>
