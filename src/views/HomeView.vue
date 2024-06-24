<template>
  <main>
    <div class="header">
      <div class="left">
        <h1>记录</h1>
      </div>
      <div class="right">
        <!-- 圆形头像 -->
        <img src="https://avatars.githubusercontent.com/u/204768?v=4" alt="头像" width="40" height="40"
          style="border-radius: 50%;" />
      </div>
    </div>

    <div class="record">
      <div class="left">
        <p>{{ currentDate }}</p>
      </div>

      <!-- <div class="right">
        <button @click="showRecordData">日期</button>
      </div> -->
    </div>
    <SwipeCard class="swipe" @click="takeRecord" @hasData="allCardsHaveData = $event" />

    <!-- 生成报告按钮 -->
     <div class="g-button">
      <button 
        @click="generateReport"
        :disabled="!allCardsHaveData"
        :class="{ 'disabled-button': !allCardsHaveData }"
      >
        {{ allCardsHaveData ? '生成报告' : '数据不足' }}
      </button>
      </div>

    <RecordModal :isVisible="isModalVisible" :recordType="currentRecordType" @close="hideModal" @save="handleSave" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SwipeCard from '../components/SwipeCard.vue';
import RecordModal from '../components/RecordModal.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios';

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

moment.updateLocale('zh-cn', {
  Weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  weekdaysMin: ['日', '一', '二', '三', '四', '五', '六']
});
moment.locale('zh-cn');

const currentDate = computed(() => {
  return moment().format('YYYY年M月D日 dddd');
});

const isModalVisible = ref(false);
const currentRecordType = ref('');
const allCardsHaveData = ref(false);

const takeRecord = (recordType: string) => {
  currentRecordType.value = recordType;
  isModalVisible.value = true;
}

const hideModal = () => {
  isModalVisible.value = false;
}

const handleSave = (record: any) => {
  console.log('记录内容:', record);
  if (record.type === '心情状态') {
    console.log('心情状态:', record.content);
    // 发送请求
    axios.post(`${apiBaseUrl}/record/mood`, {
      mood: record.content,
      uuid: authStore.user?.uuid
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  } else if (record.type === '生活习惯') {
    console.log('生活习惯:', record.content);
    axios.post(`${apiBaseUrl}/record/lifestyle`, {
      ...record.content,
      uuid: authStore.user?.uuid
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  } else {
    console.log('症状:', record.content);
    axios.post(`${apiBaseUrl}/record/symptoms`, {
      symptoms: record.content,
      uuid: authStore.user?.uuid
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  }
  window.location.reload();
  hideModal();
}

// const showRecordData = () => {
//   router.push('/record');
// }

const generateReport = () => {
  if (allCardsHaveData.value) {
    console.log('生成报告');
    router.push('/report');
  } else {
    console.log('数据不足，无法生成报告');
  }
}
</script>

<style scoped>
main {
  padding: 2rem;
}

.header,
.record {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.swipe {
  /* 将卡片的宽度设置为1占满全屏 */
  width: calc(100% + 4rem);
  /* 这里的4rem是抵消app中的2rem padding */
  margin-left: -2rem;
  /* 同样的2rem */
  height: 50vh;
}

h1 {
  font-size: 2rem;
  margin-top: 1rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: bold;
  color: #828282;
  margin-bottom: 0.5rem;
}

.g-button {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

button {
  padding: 1rem;
  width: 100vw;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
}

button.disabled-button {
  background-color: #d3d3d3;
  cursor: not-allowed;
}
</style>