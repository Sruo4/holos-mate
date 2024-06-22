<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>记录心情/状态/症状</h2>
        <textarea v-model="recordText" placeholder="请输入记录内容"></textarea>
        <button @click="saveRecord">保存</button>
        <button @click="close">取消</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 定义一个ref来存储记录内容
  const recordText = ref('');
  
  // 接收props
  const props = defineProps({
    isVisible: Boolean
  });
  
  // 发出事件
  const emit = defineEmits(['close', 'save']);
  
  // 关闭浮窗
  const close = () => {
    emit('close');
  }
  
  // 保存记录
  const saveRecord = () => {
    emit('save', recordText.value);
    close();
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px 12px 0 0;
    width: 100%;
    max-width: 500px;
    height: 80%;
  }

  .modal-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 1rem;
  }
  </style>