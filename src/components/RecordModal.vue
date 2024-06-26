<!-- RecordModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button @click="close">取消</button>
      <h2>{{ recordType }}</h2>
      <component :is="currentFormComponent"></component>
      <button @click="saveRecord">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MoodForm from './icons/MoodForm.vue';
import LifestyleForm from './icons/LifeForm.vue';
import GeneralForm from './icons/SymptomsForm.vue';

const recordText = ref('');
const moodValue = ref(50);

// 生活习惯相关数据
const height = ref(0);
const weight = ref(0);
const bodyFat = ref(0);
const sleepHours = ref(0);
const steps = ref(0);
const bmi = ref(0);
const calories = ref(0);

const props = defineProps({
  isVisible: Boolean,
  recordType: String
});

const emit = defineEmits(['close', 'save']);

const close = () => {
  emit('close');
}

const saveRecord = () => {
  let content = {};
  if (props.recordType === '心情状态') {
    content = moodValue.value;
  } else if (props.recordType === '生活习惯') {
    content = {
      height: height.value,
      weight: weight.value,
      bmi: bmi.value,
      bodyFat: bodyFat.value,
      sleepHours: sleepHours.value,
      steps: steps.value,
      calories: calories.value
    };
  } else {
    content = recordText.value;
  }
  emit('save', { type: props.recordType, content });
  close();
}

// 使用一个 getter 函数作为 watch 的第一个参数
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    recordText.value = '';
    height.value = 0;
    weight.value = 0;
    bodyFat.value = 0;
    sleepHours.value = 0;
    steps.value = 0;
    bmi.value = 0;
    calories.value = 0;
    }
    });

const currentFormComponent = computed(() => {
switch (props.recordType) {
  case '心情状态':
    return MoodForm;
  case '生活习惯':
    return LifestyleForm;
  default:
    return GeneralForm;
}
});
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
</style>

