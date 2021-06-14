<template>
  <div>
    <p>編集 {{ id }}</p>
    <template v-if="!editing">
      <p>読込中</p>
    </template>
    <template v-else>
      <textarea v-model="editing.name" />
      <input type="button" @click="onClickUpdate(editing)" value="更新" />
      <template v-if="findError('name')">
        <p>{{ findError('name').message }}</p>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/entities/user';
import { onBeforeRouteUpdate } from 'vue-router';
import { USERS_ACTION_TYPE } from '@/store/users/storeType';
import { ValidationError } from '@/errors/ValidateError';
import { ValidationErrorItem } from '@/store/users/validator';
import { UpdateForm } from '@/store/types/user';
import { deepCopy } from '@/utils/deepCopy';

type Data = {
  editing: UpdateForm;
  errors: ValidationErrorItem[];
};

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { editing, errors } = toRefs(
      reactive<Data>({
        editing: {
          id: props.id,
          name: '',
        },
        errors: [],
      })
    );

    const store = useStore();
    const init = (id: number) => {
      store.dispatch(USERS_ACTION_TYPE.FETCH_USER, id);
    };

    const onClickUpdate = async (user: IUser) => {
      try {
        await store.dispatch(USERS_ACTION_TYPE.UPDATE_USER, user);
        await store.dispatch(USERS_ACTION_TYPE.FETCH_USER, user.id);
        await store.dispatch(USERS_ACTION_TYPE.FETCH_USERS);
        errors.value = [];
      } catch (e) {
        if (e instanceof ValidationError) {
          errors.value = e.errors;
        } else {
          throw e;
        }
      }
    };

    onMounted(() => {
      init(props.id);
    });

    onBeforeRouteUpdate((to, from, next) => {
      init(Number(to.params.id));
      next();
    });

    watchEffect(() => {
      console.log('watchEffect!');
      editing.value = deepCopy<IUser>(store.state.users.user);
    });

    const findError = (name: string): ValidationErrorItem | undefined => {
      return errors.value.find((v) => v.name === name);
    };

    return {
      editing,
      errors,
      findError,
      onClickUpdate,
    };
  },
});
</script>
