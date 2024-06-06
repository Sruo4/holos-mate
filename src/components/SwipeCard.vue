<template>
  <swiper :slides-per-view="1" :centered-slides="true" :initial-slide="1">
    <swiper-slide v-for="(card, index) in cards" :key="index">
      <CardComponent :card="card" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import CardComponent from './icons/CardComponent.vue';

const cards = [
  { content: '心情状态', status: '无', icon: ['fas', 'seedling'], color: '#E6F8F5' },
  { content: '生活习惯', status: '无', icon: ['fas', 'seedling'], color: '#F2E8CC' },
  { content: '症状记录', status: '无', icon: ['fas', 'seedling'], color: '#C6CFEA' }
];
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>