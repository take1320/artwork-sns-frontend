import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import About from '@/components/pages/About/index.vue';
import AboutChild from '@/components/pages/About/Child.vue';
import Users from '@/components/pages/Users/index.vue';
import UserDetail from '@/components/pages/Users/Detail.vue';
import UserEdit from '@/components/pages/Users/Edit.vue';
import TopPage from '@/components/pages/TopPage.vue';
import LoginCallbackPage from '@/components/pages/LoginCallbackPage.vue';

export const pathName = {
  Top: 'Top',
  LoginCallback: 'LoginCallback',
  Users: 'Users',
  UserDetail: 'UserDetail',
  UserEdit: 'UserEdit',
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: pathName.Top,
    component: TopPage,
  },
  {
    path: '/login/callback',
    name: pathName.LoginCallback,
    component: LoginCallbackPage,
  },
  {
    path: '/users',
    name: pathName.Users,
    component: Users,
    children: [
      {
        path: ':id',
        name: pathName.UserDetail,
        component: UserDetail,
        props: (route) => ({
          id: Number(route.params.id),
        }),
        children: [
          {
            path: 'edit',
            name: pathName.UserEdit,
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

router.beforeEach((to, from, next) => {
  console.log('beforeEach:to', JSON.stringify(to));
  console.log('beforeEach:from', JSON.stringify(from));
  next();
});

export default router;
