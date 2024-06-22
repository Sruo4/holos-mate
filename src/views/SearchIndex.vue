<template>
    <div class="search-page">
        <header>
            <h1>知识库</h1>
        </header>

        <div class="health-12-hours">
            <p>十二时辰养生</p>
            <div>
                {{ health12Hours }} {{ hoursDesc }} 养生
                {{ healthTips }}
            </div>
        </div>

        <div class="search-form">
            <input type="text" v-model="query" placeholder="输入疾病、症状等关键词" />
            <button @click="search">搜索</button>
        </div>

        <div class="message-container" >
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

    </div>

    <div class="categories">
        <h2>分类</h2>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const query = ref('');
const errorMessage = ref('');
const router = useRouter();

// 获取当前时间
const now = new Date();
const hour = now.getHours();
const timeInfo = [
    { period: '子时', range: '(23:00 - 01:00)', tip: '子时是人体肾经的主时，此时肾气最旺，适合休息养生。' },
    { period: '丑时', range: '(01:00 - 03:00)', tip: '丑时是人体胃经的主时，此时胃气最旺，适合进食。' },
    { period: '寅时', range: '(03:00 - 05:00)', tip: '寅时是人体肝经的主时，此时肝气最旺，适合运动。' },
    { period: '卯时', range: '(05:00 - 07:00)', tip: '卯时是人体胆经的主时，此时胆气最旺，适合学习。' },
    { period: '辰时', range: '(07:00 - 09:00)', tip: '辰时是人体脾经的主时，此时脾气最旺，适合工作。' },
    { period: '巳时', range: '(09:00 - 11:00)', tip: '巳时是人体心经的主时，此时心气最旺，适合交流。' },
    { period: '午时', range: '(11:00 - 13:00)', tip: '午时是人体小肠经的主时，此时小肠气最旺，适合午休。' },
    { period: '未时', range: '(13:00 - 15:00)', tip: '未时是人体胃经的主时，此时胃气最旺，适合进食。' },
    { period: '申时', range: '(15:00 - 17:00)', tip: '申时是人体大肠经的主时，此时大肠气最旺，适合排便。' },
    { period: '酉时', range: '(17:00 - 19:00)', tip: '酉时是人体肺经的主时，此时肺气最旺，适合呼吸。' },
    { period: '戌时', range: '(19:00 - 21:00)', tip: '戌时是人体肾经的主时，此时肾气最旺，适合休息养生。' },
    { period: '亥时', range: '(21:00 - 23:00)', tip: '亥时是人体膀胱经的主时，此时膀胱气最旺，适合睡眠。' }
];

const currentPeriod = timeInfo[Math.floor(hour / 2)];
const health12Hours = currentPeriod.period;
const hoursDesc = currentPeriod.range;
const healthTips = currentPeriod.tip;

const search = () => {
    if (query.value.trim()) {
        errorMessage.value = '';
        router.push({ name: 'results', query: { q: query.value } });
    } else {
        errorMessage.value = '请输入关键词进行搜索';
    }
};
</script>

<style scoped>
.search-page {
    height: 100vh;
    padding: 16px;
}

h1 {
    margin: 0;
    font-size: 30px;
}

.search-form {
    margin-top: 16px;
    border-radius: 12px;
    height: 6vh;
    background-color: #F4F5F7;
    display: flex; /* 使用flex布局 */
    align-items: center; /* 使子元素在垂直方向上居中 */
    justify-content: space-between; /* 在水平方向上分布 */
    padding: 0 8px; /* 添加左右内边距 */
}

input {
    width: 75%;
    border: none;
    padding: 8px;
    font-size: 16px;
    outline: none;
    background-color: #F4F5F7;
}

button {
    padding: 8px;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    background-color: #F4F5F7;
    outline: none;
    width: 20%; /* 调整按钮的宽度 */
}

.message-container {
    margin-top: 16px;
    height: 4vh;
}

.error-message {
    color: red;
}

.categories {
    margin-top: 16px;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
}
</style>
