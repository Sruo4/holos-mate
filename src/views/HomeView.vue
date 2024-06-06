<script setup lang="ts">
import { ref, computed } from 'vue';
import SwipeCard from '../components/SwipeCard.vue';
import TabBar from '../components/TabBar.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
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
    <SwipeCard />
    <TabBar />
  </main>
</template>

<style scoped>
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