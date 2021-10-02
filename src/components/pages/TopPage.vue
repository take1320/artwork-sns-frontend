<template>
  <div class="TopPage">
    <template v-if="isLogin">
      <div>ログイン状態:ログイン済み</div>
      <a :href="loginUrl">ログアウトする</a>
    </template>
    <template v-else>
      <div>未ログイン</div>
      <a :href="loginUrl">ログインする</a>
    </template>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent, reactive, toRefs } from 'vue';

type Data = {
  isLogin: boolean;
};

export default defineComponent({
  components: {},
  setup() {
    // TODO: refをシンプルに書きたい
    const { isLogin } = toRefs(
      reactive<Data>({
        isLogin: false,
      })
    );

    const loginUrl = 'http://local.api.artworksns.com:5000/auth/login';
    const store = useStore();
    isLogin.value = !!store.state.auth.profile;

    return {
      isLogin,
      loginUrl,
    };
  },
});
</script>
