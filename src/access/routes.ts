import { GithubOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import accessEnum from '@/access/accessEnum'

export const routes = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
    meta: {
      hideInMenu: false,
      access: accessEnum.NOT_LOGIN,
    },
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
    meta: {
      hideInMenu: false,
      access: accessEnum.ADMIN,
    },
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
    meta: {
      hideInMenu: false,
      access: accessEnum.NOT_LOGIN,
    },
  },
  {
    path: 'HsGithub',
    name: '凤梨气泡韭的GitHub主页',
    meta: {
      hideInMenu: false,
      icon: () => h(GithubOutlined),
      access: accessEnum.NOT_LOGIN,
    },
    label: h(
      'a',
      { href: 'https://github.com/xiaohsSONG', target: '_blank' },
      '凤梨气泡韭的GitHub主页',
    ),
  },
]
