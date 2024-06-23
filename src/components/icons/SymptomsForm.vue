<template>
    <div class="record-form">
      <h2>记录不适症状</h2>
      <textarea v-model="localRecordText" placeholder="请输入出现的症状：如“头疼”" class="custom-textarea"></textarea>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    recordText: String
  });
  
  const emit = defineEmits(['update:recordText']);
  
  const localRecordText = ref(props.recordText);
  
  watch(localRecordText, (newValue) => {
    emit('update:recordText', newValue);
  });
  </script>
  
  
  <style scoped>
  .record-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    margin: auto;
    margin-top: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .custom-textarea {
    width: 100%;
    height: 150px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
    resize: none;
  }
  
  .custom-textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  </style>