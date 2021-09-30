import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { VueCookieNext } from 'vue-cookie-next';
import { useStore } from 'vuex';
import { AUTH_ACTION_TYPE } from './store/auth/storeType';

// 初期処理をコンポーネントに上書き
App.setup = () => {
  console.log('hoge');
  const store = useStore();
  store.dispatch(AUTH_ACTION_TYPE.INIT_ACCESS_TOKEN).then(() => {
    console.log('store token:', store.state.auth.accessToken);
  });
};

const app = createApp(App);
app.config.errorHandler = function (err, vm, info) {
  console.error(`Captured in errorHandler: ${info}`, err);
};
app.use(store);
app.use(router);
app.use(VueCookieNext);
app.mount('#app');
