import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/pages/Home.vue';
import About from '@/components/pages/About/index.vue';
import AboutChild from '@/components/pages/About/Child.vue';
import Users from '@/components/pages/Users/index.vue';
import UserDetail from '@/components/pages/Users/Detail.vue';
import UserEdit from '@/components/pages/Users/Edit.vue';

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
