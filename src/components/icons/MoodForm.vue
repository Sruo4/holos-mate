<template>
    <div class="record-form">
      <h2>选取今天整体感受</h2>
      <div class="flower-container">
        <div class="flower">
          <div class="petal" :style="petalStyle"></div>
          <div class="petal" :style="petalStyle"></div>
          <div class="petal" :style="petalStyle"></div>
          <div class="petal" :style="petalStyle"></div>
          <div class="center"></div>
        </div>
      </div>
      <div class="mood-description">{{ moodDescription }}</div>
      <input type="range" v-model="localMoodValue" min="0" max="100" @input="updateFlower" class="custom-slider" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    moodValue: String
  });
  const emit = defineEmits(['update:moodValue']);
  
  const localMoodValue = ref(props.moodValue ?? 0);
  
  watch(localMoodValue, (newValue) => {
    emit('update:moodValue', newValue);
  });
  
  const petalStyle = computed(() => {
    const color = getColorFromMood(localMoodValue.value);
    const scale = localMoodValue.value / 100 + 0.5;
    return {
      backgroundColor: color,
      transform: `scale(${scale})`
    };
  });
  
  const moodDescription = computed(() => {
    const value = localMoodValue.value;
    if (value <= 20) {
      return '非常不愉快';
    } else if (value <= 40) {
      return '有点不愉快';
    } else if (value <= 60) {
      return '不悲不喜';
    } else if (value <= 80) {
      return '有点愉快';
    } else {
      return '非常愉快';
    }
  });
  
  const getColorFromMood = (value: number) => {
    if (value <= 20) {
      return `rgba(128, 0, 128, ${value / 100 + 0.5})`; // 紫色
    } else if (value <= 40) {
      return `rgba(0, 0, 255, ${value / 100 + 0.5})`; // 蓝色
    } else if (value <= 60) {
      return `rgba(135, 206, 235, ${value / 100 + 0.5})`; // 天蓝色
    } else if (value <= 80) {
      return `rgba(196, 233, 112, ${value / 100 + 0.5})`; // 绿色
    } else {
      return `rgba(255, 165, 0, ${value / 100 + 0.5})`; // 橙色
    }
  };
  
  const updateFlower = () => {
    // 更新花瓣样式
  };
  </script>
  
  <style scoped>
  .record-form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .mood-description {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .flower-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  
  .flower {
    position: relative;
    width: 100px;
    height: 100px;
  }
  
  .petal {
    position: absolute;
    width: 50px;
    height: 50px;
    background: pink;
    border-radius: 50%;
    transform-origin: bottom right;
  }
  
  .petal:nth-child(1) {
    top: 0;
    left: 50%;
    transform: rotate(0deg) translateX(-50%);
  }
  
  .petal:nth-child(2) {
    top: 50%;
    right: 0;
    transform: rotate(90deg) translateY(-50%);
  }
  
  .petal:nth-child(3) {
    bottom: 0;
    left: 50%;
    transform: rotate(180deg) translateX(-50%);
  }
  
  .petal:nth-child(4) {
    top: 50%;
    left: 0;
    transform: rotate(-90deg) translateY(-50%);
  }
  
  .center {
    position: absolute;
    width: 30px;
    height: 30px;
    background: yellow;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .custom-slider {
    margin-top: 2rem;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 2rem;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    border-radius: 20px;
  }
  
  .custom-slider:hover {
    opacity: 1;
  }
  
  .custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    background: white;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  
  .custom-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: white;
    cursor: pointer;
    border-radius: 50%;
  }



  
  </style>