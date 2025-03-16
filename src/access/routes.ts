import { GithubOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import ACCESS_ENUM from '@/access/accessEnum'

export const routes = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
    meta: {
      hideInMenu: false,
      access: ACCESS_ENUM.NOT_LOGIN,
      icon: () => h(HomeOutlined),
    },
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
    meta: {
      hideInMenu: false,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    key:"/add_picture",
    label:"创建图片",
    title:"创建图片",
    meta: {
      hideInMenu: false,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {  
    key: '/admin/pictureManage',  
    label: '图片管理',  
    title: '图片管理',  
    meta: {
      hideInMenu: false,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: 'HsGithub',
    name: '凤梨气泡韭的GitHub主页',
    meta: {
      hideInMenu: false,
      icon: () => h(GithubOutlined),
      access: ACCESS_ENUM.NOT_LOGIN,
    },
    label: h(
      'a',
      { href: 'https://github.com/xiaohsSONG', target: '_blank' },
      '凤梨气泡韭的GitHub主页',
    ),
  },
]

