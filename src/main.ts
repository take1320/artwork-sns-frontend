import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { AUTH_ACTION_TYPE } from './store/auth/storeType';

const setup = async () => {
  await store.dispatch(AUTH_ACTION_TYPE.INIT);
  // エラー時の処理
};

setup().then(() => {
  const app = createApp(App);
  app.config.errorHandler = function (err, vm, info) {
    console.error(`Captured in errorHandler: ${info}`, err);
  };
  app.use(store);
  app.use(router);
  app.mount('#app');
});
