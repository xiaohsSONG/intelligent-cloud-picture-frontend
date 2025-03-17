import UserManagePage from '@/pages/admin/UserManagePage.vue'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddPicturePage from '@/pages/picture/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import PictureDetailPage from '@/pages/picture/PictureDetailPage.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import { h } from 'vue'
import { HomeOutlined, UserOutlined, PlusOutlined, PictureOutlined, LoginOutlined, FormOutlined } from '@ant-design/icons-vue'

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
      name: '添加图片',
      component: AddPicturePage,
      meta: {
        access: ACCESS_ENUM.ADMIN,
        icon: () => h(PlusOutlined),
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
    }
  ],
})

export default router
