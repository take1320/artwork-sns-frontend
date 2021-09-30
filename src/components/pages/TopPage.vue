<template>
  <div class="TopPage">
    ログイン状態: 未ログイン
    <a :href="loginUrl">ログインする</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const loginUrl = 'http://local.api.artworksns.com:5000/auth/login';

    return {
      loginUrl,
    };
  },
});
</script>
