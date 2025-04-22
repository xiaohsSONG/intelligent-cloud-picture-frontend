import UserManagePage from '@/pages/admin/UserManagePage.vue'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import SpaceManagePage from '@/pages/admin/SpaceManagePage.vue'
import MySpacePage from '@/pages/space/MySpacePage.vue'
import SpaceDetailPage from '@/pages/space/SpaceDetailPage.vue'
import NoAuth from '@/pages/NoAuth.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddPicturePage from '@/pages/picture/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import PictureDetailPage from '@/pages/picture/PictureDetailPage.vue'
import AddSpacePage from '@/pages/space/AddSpacePage.vue'
import SearchPicturePage from '../pages/picture/SearchPicturePage.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import { h } from 'vue'
import { HomeOutlined, UserOutlined, PlusOutlined, PictureOutlined, LoginOutlined, FormOutlined, GithubOutlined, DatabaseOutlined } from '@ant-design/icons-vue'
import AddPictureBatchPage from '@/pages/picture/AddPictureBatchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
      meta: {
        access: ACCESS_ENUM.NOT_LOGIN,
        icon: () => h(HomeOutlined),
      }
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
      meta: {
        hideInMenu: true,
        icon: () => h(LoginOutlined),
      }
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
      meta: {
        hideInMenu: true,
        icon: () => h(FormOutlined),
      }
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagePage,
      meta: {
        access: ACCESS_ENUM.ADMIN,
        icon: () => h(UserOutlined),
      }
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage,
      meta: {
        access: ACCESS_ENUM.USER,
        icon: () => h(PlusOutlined),
      }
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: AddPictureBatchPage,
      meta: {
        hideInMenu: true,
      }
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagePage,
      meta: {
        access: ACCESS_ENUM.ADMIN,
        icon: () => h(PictureOutlined),
      }
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true,
      meta: {
        hideInMenu: true,
      }
    },
    {
      path: '/search_picture',
      name: '图片搜索',
      component: SearchPicturePage,
      meta: {
        hideInMenu: true,
      }
    },
    {
      path: '/admin/spaceManage',
      name: '空间管理',
      component: SpaceManagePage,
      meta: {
        access: ACCESS_ENUM.ADMIN,
        icon: () => h(DatabaseOutlined),
      }
    },
    {
      path: '/add_space',
      name: '创建空间',
      component: AddSpacePage,
      meta:{
        hideInMenu:true
      }
    },

    {
      path: '/my_space',
      name: '我的空间',
      component: MySpacePage,
      meta: {
        hideInMenu: true,
      }
    },
    {
      path: '/space/:id',
      name: '空间详情',
      component: SpaceDetailPage,
      meta: {
        hideInMenu: true,
      }
    },

    {
      path: '/noAuth',
      name: '403',
      component: NoAuth,
      meta: {
        hideInMenu: true,
      }
    },
    {
      path: '/Github',
      name: 'MyGitHub',
      component: { render: () => null },
      beforeEnter(to, from, next) {
        window.location.href = 'https://github.com/xiaohsSONG';
        next('/');
      },
      meta: {
        access: ACCESS_ENUM.NOT_LOGIN,
        icon: () => h(GithubOutlined),
      },
    },
  ],
})

export default router
