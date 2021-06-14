import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.errorHandler = function (err, vm, info) {
  console.error(`Captured in errorHandler: ${info}`, err);
};

app.use(store).use(router).mount('#app');
