<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/智能云图库.png" alt="logo" />
            <div class="title">智能云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div v-if="loginUserStore.loginUser.id">
          {{ loginUserStore.loginUser.userName ?? '无名' }}
        </div>
        <div v-else class="user-login-status" style="height: 100%">
          <a-button type="primary" href="/user/login">登陆</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/user'

//当前要高亮的菜单项
const current = ref<string[]>(['home'])
const router = useRouter()
//路由跳转后，更新当前高亮菜单项
router.afterEach((to) => {
  current.value = [to.path]
})

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    icon: () => h(AppstoreOutlined),
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])

//路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

//获取用户信息
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
</script>

<style>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title {
  color: #000;
  font-size: 18px;
  margin-left: 16px;
}

#globalHeader .logo {
  height: 48px;
}
</style>
