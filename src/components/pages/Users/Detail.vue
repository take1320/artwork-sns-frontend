<template>
  <div style="background: yellow">
    <p>詳細 {{ id }}</p>
    <template v-if="!user">
      <p>読込中</p>
    </template>
    <template v-else>
      <p>{{ user.id }}</p>
      <p>{{ user.name }}</p>
      <router-link :to="{ name: pathName.UserEdit, params: { id: user.id } }">
        編集する
      </router-link>
      <router-view />
      <input type="button" @click="onClickDelete(user.id)" value="削除" />
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
import { IUser } from '@/entities/user';
import { useRouter, onBeforeRouteUpdate, RouterView } from 'vue-router';
import { pathName } from '@/router';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';
import { useStore } from '@/store';

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
      init(Number(to.params.id));
      next();
    });

    const user = computed((): IUser | null => {
      return store.state.users.user;
    });

    const router = useRouter();
    const onClickDelete = async (id: number) => {
      await store.dispatch(USERS_ACTION_TYPE.DELETE_USER, id);
      await router.push({
        name: pathName.Users,
      });
    };

    return {
      pathName,
      user,
      onClickDelete,
    };
  },
});
</script>
