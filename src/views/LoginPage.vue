<template>
    <div class="login-container">
      <div class="login-box">
        <div class="logo">Intelli<span class="os">TS</span></div>
        <h2>{{ mode === 'login' ? '登录您的网站' : '注册账号' }}</h2>
        <form class="login-form" @submit.prevent="submitForm">
          <div class="form-item">
            账号
            <input class="form-input" v-model="form.username" placeholder="账号/邮箱" />
          </div>
          <div class="form-item">
            密码
            <input type="password" class="form-input" v-model="form.password" placeholder="密码" />
          </div>
          <div class="form-item" v-if="mode !== 'login'">
            确认密码
            <input type="password" class="form-input" v-model="form.confirmPassword" placeholder="确认密码" />
          </div>
          <button type="submit" class="action-button" >
            {{ mode === 'login' ? '登录 →' : '确认注册' }}
          </button>
          <button type="button" class="action-button" @click="switchMode">
            {{ mode === 'login' ? '注册' : '返回登录' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const form = ref({
    username: '',
    password: '',
    confirmPassword: '' // 用于注册模式的确认密码
  });
  const mode = ref('login'); // 默认为登录模式
  
  const switchMode = () => {
    mode.value = mode.value === 'login' ? 'register' : 'login';
  };
  
  const submitForm = async () => {
    try {
      if (mode.value === 'login') {
        const { username, password } = form.value;
        await authStore.login(username, password);
        if (authStore.isAuthenticated) {
          router.push('/');
        }
      } else {
        const { username, password, confirmPassword } = form.value;
  
        if (password !== confirmPassword) {
          alert('密码和确认密码不一致！');
          return;
        }
  
        await authStore.register(username, password);
        alert('注册成功！');
        switchMode();
      }
    } catch (error) {
      alert('操作失败！');
    }
  };
  </script>
  
  <style>
  .login-container {
      display: flex;
      height: 100vh;
  }
  </style>