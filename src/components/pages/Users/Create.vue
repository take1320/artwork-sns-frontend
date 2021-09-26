<template>
  <div>
    <p>登録</p>
    <textarea v-model="form.name" />
    <input type="button" @click="onClickCreate(form)" value="登録" />
    <template v-for="error in errors" :key="error.name">
      <p>{{ error.message }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { useStore } from 'vuex';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';
import { CreateForm } from '@/store/types/user';
import { ValidationError } from '@/errors/ValidateError';
import { ApiRequestError } from '@/errors/ApiRequestError';
import { ValidationErrorItem } from '@/store/users/validator';

type Data = {
  form: CreateForm;
  errors: ValidationErrorItem[];
};

export default defineComponent({
  setup() {
    const { form, errors } = toRefs(
      reactive<Data>({
        form: {
          name: '',
        },
        errors: [],
      })
    );

    const store = useStore();

    const onClickCreate = async (value: CreateForm) => {
      await store
        .dispatch(USERS_ACTION_TYPE.CREATE_USER, value)
        .then(async () => {
          form.value.name = '';
          errors.value = [];
          await store.dispatch(USERS_ACTION_TYPE.FETCH_USERS);
        })
        .catch((e) => {
          if (e instanceof ValidationError) {
            errors.value = e.errors;
          } else if (e instanceof ApiRequestError) {
            console.log(JSON.stringify(e.errors));
          } else {
            throw e;
          }
        });
    };

    return {
      form,
      errors,
      onClickCreate,
    };
  },
});
</script>
