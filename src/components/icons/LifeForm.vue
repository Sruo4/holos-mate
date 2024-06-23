<!-- LifestyleForm.vue -->
<template>
    <div class="record-form">
      <h2>填写最近的身高体重</h2>
      <input type="number" v-model="height" placeholder="身高(cm)" @input="calculateBMI" />
      <input type="number" v-model="weight" placeholder="体重(kg)" @input="calculateBMI" />
      <div class="bmi-result">BMI: {{ bmi }}</div>
      
      <h2>填写体脂率</h2>
      <input type="number" v-model="bodyFat" placeholder="体脂率(%)" />
  
      <h2>填写睡眠时长</h2>
      <input type="number" v-model="sleepHours" placeholder="睡眠时长(小时)" />
  
      <h2>填写步数</h2>
      <input type="number" v-model="steps" placeholder="步数" @input="calculateCalories" />
      <div class="calories-result">卡路里: {{ calories }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const height = ref<number | string>(0);
  const weight = ref<number | string>(0);
  const bodyFat = ref<number | string>(0);
  const sleepHours = ref<number | string>(0);
  const steps = ref<number | string>(0);
  const bmi = ref<number>(0);
  const calories = ref<number>(0);
  
  const calculateBMI = () => {
    const heightNum = Number(height.value);
    const weightNum = Number(weight.value);
    if (heightNum > 0 && weightNum > 0) {
      bmi.value = parseFloat((weightNum / ((heightNum / 100) ** 2)).toFixed(2));
    }
  };
  
  const calculateCalories = () => {
    calories.value = parseFloat((Number(steps.value) * 0.04).toFixed(2)); // 假设每步消耗0.04卡路里
  };
  
  watch(height, calculateBMI);
  watch(weight, calculateBMI);
  watch(steps, calculateCalories);
  </script>
  
  <style scoped>
  .record-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .bmi-result, .calories-result {
    margin: 0.5rem 0;
  }
  </style>