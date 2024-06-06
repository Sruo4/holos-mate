<template>
  <swiper :slidesPerView="'auto'"    :centeredSlides="true"  :spaceBetween="20" :initial-slide="1" class="mySwiper">
    <swiper-slide v-for="(card, index) in cards" :key="index">
      <CardComponent :card="card" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import CardComponent from './icons/CardComponent.vue';

const cards = [
  { content: '心情状态', status: '无', icon: ['fas', 'seedling'], color: '#E6F8F5' },
  { content: '生活习惯', status: '无', icon: ['fas', 'person-walking'], color: '#F2E8CC' },
  { content: '症状记录', status: '无', icon: ['fas', 'heart-circle-check'], color: '#C6CFEA' }
];
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  width: 18.5rem;
}
</style>