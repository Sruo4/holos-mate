import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as { username: string } | null,
    token: null as string | null, // 修改类型为 string | null
    rememberMe: false, // 添加rememberMe状态
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        // 调用 API 进行登录
        const response = await axios.post('api/login', { username, password });
        if (response.status === 200) {
          // 登录成功
          console.log('登录成功', response.data);
          this.isAuthenticated = true;
          this.user = { username }; // 仅保存用户名，具体信息视需求添加
          this.token = response.data.token; // 保存JWT

          if (this.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token as string}`; // 设置默认的Authorization头
          }

          // 如果用户选择了记住我
          if (this.rememberMe) {
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('token', this.token as string);
          }
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
      this.token = null;
      delete axios.defaults.headers.common['Authorization']; // 移除默认的Authorization头
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    async register(username: string, password: string) {
      try {
        // 注册逻辑
        const response = await axios.post('api/register', { username, password });
        if (response.status === 201) {
          // 注册成功
          console.log('注册成功', response.data);
        } else {
          // 注册失败
          console.error('注册失败', response.data);
          throw new Error(response.data);
        }
      } catch (error) {
        // 处理请求错误
        console.error('注册请求失败', error);
        throw error;
      }
    },
    checkRememberMe() {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        this.isAuthenticated = true;
        this.user = JSON.parse(user);
        this.token = token;

        if (this.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token as string}`;
        }
      }
    }
  },
});