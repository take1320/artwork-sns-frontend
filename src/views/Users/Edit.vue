<template>
  <div>
    <p>編集 {{ id }}</p>
    <template v-if="!editing">
      <p>読込中</p>
    </template>
    <template v-else>
      <textarea v-model="editing.name" />
      <input type="button" @click="onClickUpdate(editing)" value="更新" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/entities/user';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    let editing = toRefs<Partial<IUser>>({});

    const store = useStore();
    const init = (id: number) => {
      store.dispatch('users/fetchUser', id);
    };

    const onClickUpdate = (user: IUser) => {
      store.dispatch('users/updateUser', user);
    };

    onMounted(() => {
      init(props.id);
    });

    onBeforeRouteUpdate((to, from, next) => {
      init(Number(to.params.id));
      next();
    });

    watchEffect(() => {
      console.log('watchEffect!');
      editing = store.state.users.user;
    });

    return {
      editing,
      onClickUpdate,
    };
  },
});
</script>
