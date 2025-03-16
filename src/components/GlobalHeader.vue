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
          :items="menus"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <ASpace>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '无名' }}
              </ASpace>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {  LogoutOutlined } from '@ant-design/icons-vue'
import { message, type MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/userLoginStore'
import { userLogoutUsingPost } from '@/api/userController'
import { routes } from '@/access/routes'
import checkAccess from '@/access/checkAccess'

//获取用户信息
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
console.log('登录用户信息:', loginUserStore.loginUser)
//当前要高亮的菜单项
const current = ref<string[]>(['home'])
const router = useRouter()
//路由跳转后，更新当前高亮菜单项
router.afterEach((to) => {
  current.value = [to.path]
})

// 把路由项转换为菜单项
const menuToRouteItem = (item: any) => {
  return {
    key: item.key, // 用于路由的跳转
    label: item.label,
    title: item.title,
    icon: item.icon ?? undefined,
  }
}

// 过滤菜单项
const items = computed(() => {
  return routes
    .filter((item) => {
      if (item.meta?.hideInMenu) {
        return false
      }
      // 根据权限过滤菜单，有权限则返回 true，则保留该菜单
      return checkAccess(loginUserStore.loginUser, item.meta?.access as string)
    })
    .map(menuToRouteItem) // 转换为菜单项格式
})

const menus = ref<MenuProps['items']>(items.value)

//路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

//退出登录
const doLogout = async () => {
  const res = await userLogoutUsingPost()
  console.log(res)
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  } else {
    message.error('退出登录失败, ' + res.data.message)
  }
}
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
