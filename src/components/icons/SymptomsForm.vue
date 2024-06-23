<!-- GeneralForm.vue -->
<template>
    <textarea v-model="recordText" placeholder="请输入记录内容"></textarea>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const recordText = ref('');
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 1rem;
  }
  </style>