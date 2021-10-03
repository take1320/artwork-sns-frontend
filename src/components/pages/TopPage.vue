<template>
  <div class="TopPage">
    <template v-if="isLogin">
      <div>ログイン状態:ログイン済み</div>
      <a @click="onClickLogoutButton">ログアウトする</a>
    </template>
    <template v-else>
      <div>未ログイン</div>
      <a :href="loginUrl">ログインする</a>
    </template>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { AUTH_ACTION_TYPE } from '@/store/auth/storeType';
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
    const store = useStore();

    const loginUrl = 'http://local.api.artworksns.com:5000/auth/login';
    isLogin.value = !!store.state.auth.profile;

    const onClickLogoutButton = async () => {
      // アクセストークンを削除した後、トップページへ遷移する
      await store.dispatch(AUTH_ACTION_TYPE.DISCARD_ACCESS_TOKEN);
      window.location.href = '/';
    };

    return {
      isLogin,
      loginUrl,
      onClickLogoutButton,
    };
  },
});
</script>
