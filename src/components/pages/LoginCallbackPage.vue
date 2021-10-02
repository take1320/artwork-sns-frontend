<template>
  <div class="LoginCallbackPage">ログイン中</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { AUTH_ACTION_TYPE } from '@/store/auth/storeType';
import { useRouter } from 'vue-router';
import { pathName } from '@/router';

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();

    // アクセストークンの取得とAuthStoreの初期化
    const login = async (): Promise<void> => {
      await store.dispatch(AUTH_ACTION_TYPE.FETCH_ACCESS_TOKEN);
      await store.dispatch(AUTH_ACTION_TYPE.INIT);
    };

    login()
      .then(() => {
        router.push({
          name: pathName.Top,
        });
      })
      .catch((e) => {
        // TODO: ログイン失敗時の遷移を検討する
        alert('ログインに失敗しました');
        throw e;
      });
  },
});
</script>
