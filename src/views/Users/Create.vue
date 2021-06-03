<template>
  <div>
    <p>登録</p>
    <textarea v-model="form.name" />
    <input type="button" @click="onClickCreate(form)" value="登録" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { useStore } from 'vuex';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';
import { CreateForm } from '@/store/types/user';

type Data = {
  form: CreateForm;
};

export default defineComponent({
  setup() {
    const data = reactive<Data>({
      form: {
        name: '',
      },
    });

    const store = useStore();

    const onClickCreate = async (form: CreateForm) => {
      await store.dispatch(USERS_ACTION_TYPE.CREATE_USER, form);
      data.form.name = '';
      await store.dispatch(USERS_ACTION_TYPE.FETCH_USERS);
    };

    return {
      ...toRefs(data),
      onClickCreate,
    };
  },
});
</script>
