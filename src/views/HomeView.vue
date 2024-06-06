<script setup lang="ts">
import { computed } from 'vue';
import SwipeCard from '../components/SwipeCard.vue';
import TabBar from '../components/TabBar.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.updateLocale('zh-cn', {
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  weekdaysMin: ['日', '一', '二', '三', '四', '五', '六']
});
moment.locale('zh-cn');

// Define the formatted date as a computed property
const currentDate = computed(() => {
  return moment().format('YYYY年M月D日 dddd');
});
</script>

<template>
  <main>
    <h1>记录</h1>
    <p>{{ currentDate }}</p>
    <SwipeCard class="swipe"/>
    <TabBar />
  </main>
</template>


<style scoped>
.swipe {
  /* 将卡片的宽度设置为1占满全屏 */
  width: calc(100% + 4rem);
  /* 这里的4rem是抵消app中的2rem padding */
  margin-left: -2rem;
  /* 同样的2rem */
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