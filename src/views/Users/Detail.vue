<template>
  <div>
    <p>詳細</p>
    <template v-if="!user">
      <p>読込中</p>
    </template>
    <template v-else>
      <p>{{ user.id }}</p>
      <p>{{ user.name }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/entities/user';

interface Props {
  id: number;
}

export default defineComponent({
  setup(props: Props) {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch('users/fetchOne', { id: props.id });
    });

    const user = computed((): IUser | null => {
      return store.state.users.show;
    });

    return {
      user,
    };
  },
});
</script>
