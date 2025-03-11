import router from '@/router'
import { useLoginUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'


// 是否为首次获取登录用户
let firstFetchLoginUser = true;

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;
  if (firstFetchLoginUser) {
    await  loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser
    firstFetchLoginUser = false
  }

  const toUrl = to.fullPath
  if (toUrl.startsWith('/admin')) {
    if(!loginUser || loginUser.userRole !== 'admin') {
      message.error('没有权限')
      next(`/user/login?redirectTo=${to.fullPath}`)
      return
    }
  }
  next()
})
