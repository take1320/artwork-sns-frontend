import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About/index.vue';
import AboutChild from '../views/About/Child.vue';
import Users from '../views/Users/index.vue';
import UserDetail from '../views/Users/Detail.vue';
import UserEdit from '../views/Users/Edit.vue';

export const pageName = {
  Users: 'Users',
  UserDetail: 'UserDetail',
  UserEdit: 'UserEdit',
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: pageName.Users,
    component: Users,
    children: [
      {
        path: ':id',
        name: pageName.UserDetail,
        component: UserDetail,
        props: (route) => ({
          id: Number(route.params.id),
        }),
        children: [
          {
            path: 'edit',
            name: pageName.UserEdit,
            component: UserEdit,
            props: (route) => ({
              id: Number(route.params.id),
            }),
          },
        ],
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
