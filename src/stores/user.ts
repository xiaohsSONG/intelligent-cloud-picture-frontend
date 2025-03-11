import { ref } from 'vue'
import { defineStore } from 'pinia'

interface User {
  id?: number
  userName: string
}

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<User>({
    userName: '未登录',
  })

  async function fetchLoginUser() {
    // 测试用户登录，3 秒后登录
    setTimeout(() => {
      loginUser.value = { userName: '测试用户', id: 1 }
    }, 3000)
  }

  function setLoginUser(newLoginUser: User) {
    loginUser.value = newLoginUser
  }

  return { loginUser, fetchLoginUser, setLoginUser }
})
