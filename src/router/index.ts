import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About/index.vue';
import AboutChild from '../views/About/Child.vue';
import Users from '../views/Users/index.vue';
import UserDetail from '../views/Users/Detail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'User',
    component: Users,
    children: [
      {
        path: ':id',
        name: 'UserDetail',
        component: UserDetail,
        props: (route) => ({
          id: route.query.id,
        }),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'child',
        name: 'AboutChild',
        component: AboutChild,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
