<template>
  <main>
    <div class="header">
      <div class="left">
        <h1>记录</h1>
      </div>
      <div class="right">
       <!-- 圆形头像 -->
        <img src="https://avatars.githubusercontent.com/u/204768?v=4" alt="头像" width="40" height="40" style="border-radius: 50%;"/>
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
    <SwipeCard class="swipe" @click="takeRecord" />

    <RecordModal :isVisible="isModalVisible" :recordType="currentRecordType" @close="hideModal" @save="handleSave" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SwipeCard from '../components/SwipeCard.vue';
import RecordModal from '../components/RecordModal.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

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



const takeRecord = (recordType: string) => {
  currentRecordType.value = recordType;
  isModalVisible.value = true;
}

const hideModal = () => {
  isModalVisible.value = false;
}

const handleSave = (record: any) => {
  console.log('记录内容:', record);
  hideModal();
}

const showRecordData = () => {
  router.push('/record');
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
</style>