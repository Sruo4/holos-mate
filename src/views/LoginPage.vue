<template>
  <div class="login-container">
    <div class="background"></div>
    <div class="login-box">
      <div class="logo">HolosMate</div>
      <h2>{{ mode === 'login' ? '登录' : '注册' }}</h2>
      <form class="login-form" @submit.prevent="submitForm">
        <input class="form-input" v-model="form.username" placeholder="账号/邮箱" />
        <input type="password" class="form-input" v-model="form.password" placeholder="密码" />
        <input type="password" class="form-input" v-if="mode !== 'login'" v-model="form.confirmPassword"
          placeholder="确认密码" />
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
<style scoped>
.results-page {
  padding: 2rem;
  overflow-y: auto;
  /* 启用垂直滚动 */
  height: 100%;
  /* 确保高度占满父容器 */
}

header {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

h1 {
  font-size: 2rem;
}

.results {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.result-item {
  cursor: pointer;
  flex: 1 0 250px;
  margin: 8px 0;
}

.result-card {
  background-color: white;
  border-radius: 8px;
  height: 120px;
  padding: 16px;
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.result-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.result-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
}

.result-info {
  flex: 1;
  text-align: left;
}

.result-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.result-description {
  font-size: 14px;
  color: #666;
  margin: 8px 0 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 倒数第二个按钮 */
button:nth-last-child(2) {
  margin: 8px 8px 0 0;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #FEDE33;
  color: black;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

button:last-child {
  margin: 8px 8px 0 0;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: black;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}
</style>