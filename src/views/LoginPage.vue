<template>
  <div class="login-container">
    <div class="background"></div>
    <div class="login-box">
      <div class="logo">HolosMate</div>
      <h2>{{ mode === 'login' ? '登录' : '注册' }}</h2>
      <form class="login-form" @submit.prevent="submitForm">
        <input class="form-input" v-model="form.username" placeholder="账号/邮箱" />
        <input type="password" class="form-input" v-model="form.password" placeholder="密码" />
        <input type="password" class="form-input" v-if="mode !== 'login'" v-model="form.confirmPassword" placeholder="确认密码" />
        <div class="extra-options" v-if="mode === 'login'">
          <div>
            <input type="checkbox" id="remember-me" v-model="rememberMe" class="custom-checkbox" />
            <label for="remember-me" class="custom-label">记住我</label>
          </div>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        <button type="submit" class="login-button">
          {{ mode === 'login' ? '登录' : '确认注册' }}
        </button>
        <div class="switch-button" @click="switchMode">
          {{ mode === 'login' ? '没有账号？去注册' : '返回登录' }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
const rememberMe = ref(false);

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

const submitForm = async () => {
  try {
    if (mode.value === 'login') {
      const { username, password } = form.value;
      authStore.rememberMe = rememberMe.value; // 设置store中的rememberMe
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
onMounted(() => {
  authStore.checkRememberMe();
  if (authStore.isAuthenticated) {
    router.push('/');
  }
});
</script>

<style>
/* 限制页面高度 */
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
}

.login-container {
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 150px;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  /* Background在最底层 */
  background: radial-gradient(circle at 25% 20%, #fe8833, #fabe9d, #f1dace, #e8e8e8, #e8e8e8, #e8e8e8, #e8e8e8, #e8e8e8);
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  /* 确保login-box在背景上方 */
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  width: 100vw;
  padding: 20px;
  /* background: white; */
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  width: 100%;
}

.login-form input {
  padding-left: 1.5rem;
}

.form-input {
  width: 100%;
  height: 6vh;
  box-sizing: border-box;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid white
}

.extra-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.custom-checkbox {
  display: none; /* 隐藏默认的复选框 */
}

.custom-label {
  position: relative;
  padding-left: 25px; /* 为自定义复选框留出空间 */
  cursor: pointer;
}

.custom-label::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: white;
}

.custom-checkbox:checked + .custom-label::before {
  content: "✔";
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  /* color: #007bff; */
}

.forgot-password {
  color: gray;
  text-decoration: none;
}

.forgot-password:hover {
  color: #0056b3;
}

.login-button {
  width: 100%;
  height: 6vh;
  margin-top: 2vh;
  padding: 10px;
  border: none;
  border-radius: 30px;
  background-color: #FEDE33;
  color: black;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.switch-button {
  margin-top: 10px;
  color: gray;
  cursor: pointer;
  text-align: center;
}
</style>