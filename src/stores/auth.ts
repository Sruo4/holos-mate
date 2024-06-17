// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // 是否已登录
    user: null,
  }),
  actions: {
    async login(username, password) {
      try {
        // 调用 API 进行登录
        const url = `api/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const response = await axios.get(url);
        console.log(response.data);
        if (response.data.status === 200) {
          // 登录成功
          console.log('登录成功', response.data.data);
          this.isAuthenticated = true;
          this.user = response.data.data;
        } else {
          // 登录失败
          console.error('登录失败', response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        // 处理请求错误
        console.error('登录请求失败', error);
        throw error;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
    async register(username, password) {
      try {
        // 注册逻辑
        const url = `api/api/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const response = await axios.post(url);
        console.log(response.data);
        if (response.data.status === 200) {
          // 注册成功
          console.log('注册成功', response.data.data);
        } else {
          // 注册失败
          console.error('注册失败', response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        // 处理请求错误
        console.error('注册请求失败', error);
        throw error;
      }
    }
  },
});