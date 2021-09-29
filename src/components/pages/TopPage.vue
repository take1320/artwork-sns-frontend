<template>
  <div class="TopPage">
    ログインボタン表示
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
