<template>
  <swiper :slidesPerView="'auto'" :centeredSlides="true" :spaceBetween="20" :initial-slide="1" class="mySwiper">
    <swiper-slide v-for="(card, index) in cards" :key="index" @click="handleCardClick(card)">
      <CardComponent :card="card" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import CardComponent from './icons/CardComponent.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cards = ref([
  { content: '心情状态', status: '今日无数据', icon: ['fas', 'seedling'], color: '#E6F8F5' },
  { content: '生活习惯', status: '今日无数据', icon: ['fas', 'person-walking'], color: '#F2E8CC' },
  { content: '症状记录', status: '今日无数据', icon: ['fas', 'heart-circle-check'], color: '#C6CFEA' }
]);

const emit = defineEmits(['click', 'hasData']);

const handleCardClick = (card: { content: string }) => {
  emit('click', card.content);
};

const fetchCardStatus = async () => {
  try {
    const response = await axios.get('/api/card-status');
    const data = response.data;
    console.log('Card status:', data);

    let allHaveData = true;
    cards.value = cards.value.map(card => {
      const updatedCard = data.find((item: { content: string; }) => item.content === card.content);
      if (updatedCard && updatedCard.lastUpdate !== '无') {
        const time = new Date(updatedCard.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...card,
          status: `最近更新时间：${time}`
        };
      } else {
        allHaveData = false;
        return card;
      }
    });

    emit('hasData', allHaveData);
  } catch (error) {
    console.error('Error fetching card status:', error);
    emit('hasData', false);
  }
};

onMounted(fetchCardStatus);
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  width: 18.5rem;
}
</style>