<template>
  <div class="AboutChild">
    <h1>Child!!</h1>

    <div class="todos">
      <template v-for="sortTodo in sortTodos" :key="sortTodo">
        <p @click="removeTodo(sortTodo)">{{ sortTodo }}</p>
      </template>
    </div>

    <div>
      <input type="text" v-model="state.inputValue" />
      <button @click="addTodo">hoge</button>
      <p>{{ state.inputValue }}</p>
      <div v-if="state.isError" style="background: red">error desuyo</div>
    </div>
    <div>
      <input type="text" v-model="notReactive" />
      <p>{{ notReactive }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from 'vue';
import axios from 'axios';

interface State {
  todos: string[];
  inputValue: string;
  isError: boolean;
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      todos: [],
      inputValue: 'hoge',
      isError: false,
    });

    const notReactive = 'hgoe';

    const sortTodos = computed(() => {
      return [...state.todos].sort();
    });

    const addTodo = async () => {
      state.todos.push(state.inputValue);
      const res = await axios.get(
        'http://local.api.artworksns.com:5000/users/4'
      );
      state.inputValue = JSON.stringify(res.data);
    };

    const removeTodo = (value: string) => {
      state.todos = state.todos.filter((v) => v !== value);
    };

    watchEffect(() => {
      state.isError = state.inputValue === 'error';
    });

    return {
      state,
      sortTodos,
      addTodo,
      removeTodo,
      notReactive,
    };
  },
});
</script>
