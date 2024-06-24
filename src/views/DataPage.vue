<template>
  <div class="data-container">
    <header>
      <!-- 返回导航 -->
      <div @click="goBack">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
        我的
      </div>
      <h1>{{ pageTitle }}</h1>
    </header>
    <div v-if="data.length > 0">
      <div v-for="(record, index) in data" :key="index" class="data-record">
        <div class="record-time">{{ record.time }}</div>
        <div v-if="type === 'psychological'" class="record-score">{{ recordValueLabel }}: {{ (record as
          PsychologicalRecord).value }}</div>
        <div v-else-if="type === 'physical'">
          <div class="record-score">身高: {{ (record as PhysicalRecord).height }} cm</div>
          <div class="record-score">体重: {{ (record as PhysicalRecord).weight }} kg</div>
          <div class="record-score">睡眠时长: {{ (record as PhysicalRecord).sleep_hours }} 小时</div>
          <div class="record-score">步数: {{ (record as PhysicalRecord).steps }} 步</div>
        </div>
        <div v-else-if="type === 'symptoms'" class="record-score">{{ recordValueLabel }}: {{ (record as
          SymptomsRecord).value }}</div>
      </div>
    </div>
    <div v-else>
      <p>没有数据。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 定义数据类型
interface PsychologicalRecord {
  time: string;
  value: number;
}

interface PhysicalRecord {
  time: string;
  height: number;
  weight: number;
  sleep_hours: number;
  steps: number;
}

interface SymptomsRecord {
  time: string;
  value: string;
}

const route = useRoute();
const authStore = useAuthStore();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const type = route.query.type as string;

const data = ref<(PsychologicalRecord | PhysicalRecord | SymptomsRecord)[]>([]);
const pageTitle = ref('');
const recordValueLabel = ref('');

const fetchData = async () => {
  try {
    const uuid = authStore.user?.uuid;
    let response;
    if (type === 'psychological') {
      response = await axios.get(`${apiBaseUrl}/mood-record/${uuid}`);
      pageTitle.value = '心理状态数据';
      recordValueLabel.value = '心情分数';
      data.value = response?.data.map((item: { time: string; eval_value: number; }) => ({
        time: dayjs(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
        value: item.eval_value
      })) as PsychologicalRecord[];
    } else if (type === 'physical') {
      response = await axios.get(`${apiBaseUrl}/physical-record/${uuid}`);
      pageTitle.value = '体征数据';
      recordValueLabel.value = '体征值';
      data.value = response?.data.map((item: { time: string; height: number; weight: number; sleep_hours: number; steps: number; }) => ({
        time: dayjs(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
        height: item.height,
        weight: item.weight,
        sleep_hours: item.sleep_hours,
        steps: item.steps
      })) as PhysicalRecord[];
    } else if (type === 'symptoms') {
      response = await axios.get(`${apiBaseUrl}/symptoms-record/${uuid}`);
      pageTitle.value = '症状数据';
      recordValueLabel.value = '症状描述';
      data.value = response?.data.map((item: { time: string; description: string; }) => ({
        time: dayjs(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
        value: item.description
      })) as SymptomsRecord[];
    }
    console.log('获取到的数据:', data.value);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

const goBack = () => {
  window.history.back();
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.data-container {
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  padding: 2rem;
}

.data-record {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  /* width: 80%; */
  display: flex;
  flex-direction: column;
}

.record-time {
  font-size: 1rem;
  color: #333;
}

.record-score {
  font-size: 1rem;
  color: #1e90ff;
}
</style>