<template>
    
    <div class="profile-container">
        <div class="header">
            <div class="left">
                <h1>个人</h1>
            </div>
            <div class="right">
                <!-- 圆形头像 -->
                <img src="https://avatars.githubusercontent.com/u/204768?v=4" alt="头像" width="40" height="40"
                    style="border-radius: 50%;" />
            </div>
        </div>
        <!-- 个人健康数据 -->
        <div class="profile-data">
            <div class="psychological-condition card" @click="goToDataPage('psychological')">
                <div class="card-title">心理状态</div>
                <div class="card-content">心理状态数据</div>
            </div>
            <div class="data-set card" @click="goToDataPage('physical')">
                <div class="card-title">体征数据</div>
                <div class="card-content">体征数据</div>
            </div>
            <div class="symptoms card" @click="goToDataPage('symptoms')">
                <div class="card-title">症状</div>
                <div class="card-content">症状数据</div>
            </div>
        </div>
        <!-- 退出登录 -->
        <button class="logout-button" @click="loginout">退出登录</button>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const loginout = () => {
    authStore.logout();
    router.push('/login');
}

const goToDataPage = (type: string) => {
    router.push({ path: '/data', query: { type } });
}
</script>

<style scoped>
.profile-container {

    padding: 2rem;
}

.header,
.record {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* .profile-header {
    display: flex;
    flex-direction: row;
    align-items: center;
} */

.profile-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.profile-info {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
}

.profile-username {
    font-size: 1.5rem;
    font-weight: bold;
}

.self-intro {
    font-size: 1rem;
    color: #828282;
}

.profile-data {
    /* padding: 1rem; */

    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    width: 75vw;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 12px;
    height: 10vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-content {
    font-size: 1rem;
    color: #828282;
}

.logout-button {
    margin-top: 1rem;
    width: 85vw;
    height: 3rem;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0.5rem;
    cursor: pointer;
}
</style>