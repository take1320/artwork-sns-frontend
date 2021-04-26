<template>
  <div class="about">
    <h1>This is an about page index</h1>
    <a href="/about/child">here!!</a>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: { RouterView },
});
</script>
