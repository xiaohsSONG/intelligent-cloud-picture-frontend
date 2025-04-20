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
                  <a-menu-item>
                    <router-link to="/my_space">
                      <UserOutlined />
                      我的空间
                    </router-link>
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
import { LogoutOutlined,UserOutlined } from '@ant-design/icons-vue'
import { message, type MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/userLoginStore'
import { userLogoutUsingPost } from '@/api/userController'
import router from '@/router'
import checkAccess from '@/access/checkAccess'

//获取用户信息
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
console.log('登录用户信息:', loginUserStore.loginUser)
//当前要高亮的菜单项
const current = ref<string[]>(['home'])
const routerInstance = useRouter()
//路由跳转后，更新当前高亮菜单项
routerInstance.afterEach((to) => {
  current.value = [to.path]
})

// 把路由项转换为菜单项
const menuToRouteItem = (item: any) => {
  return {
    key: item.key ?? item.path, // 用于路由的跳转
    label: item.name,
    title: item.name,
    icon: item.meta.icon ?? undefined,
    meta: item.meta,
  }
}

// 过滤菜单项
const items = computed(() => {
  const routes = router.getRoutes()
  const menuItems = routes
    .filter((menu) => {
      const item = menuToRouteItem(menu)
      if (item.meta?.hideInMenu) {
        return false
      }
      // 根据权限过滤菜单，有权限则返回 true，则保留该菜单
      return checkAccess(loginUserStore.loginUser, item.meta?.access as string)
    })
    .map((menu) => {
      const item = menuToRouteItem(menu)
      if (!item.key && menu.path) {
        item.key = menu.path
      }
      return item
    })

  // 确保主页在菜单项中的第一个位置
  const homeIndex = menuItems.findIndex((item) => item.key === '/')
  if (homeIndex > 0) {
    const homeItem = menuItems.splice(homeIndex, 1)[0]
    menuItems.unshift(homeItem)
  }

  return menuItems
})
const menus = computed<MenuProps['items']>(() => items.value)

//路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  routerInstance.push({
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
