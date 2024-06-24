<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="nav">
        <div class="nav-title">
          {{ recordType }}
        </div>
        <button class="cancel-button" @click="close">取消</button>
      </div>

      <component :is="currentFormComponent" v-if="recordType === '心情状态'" :moodValue="moodValue"
        @update:moodValue="updateMoodValue"></component>
      <component :is="currentFormComponent" v-if="recordType === '生活习惯'" :height="height" :weight="weight"
        :sleepHours="sleepHours" :steps="steps" @update:height="updateHeight" @update:weight="updateWeight"
        @update:sleepHours="updateSleepHours" @update:steps="updateSteps" @update:bmi="updateBmi" @update:calories="updateCalories"></component>
      <component :is="currentFormComponent" v-if="recordType === '症状记录'" :recordText="recordText"
        @update:recordText="updateRecordText"></component>
      <button class="save-button" @click="saveRecord">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MoodForm from './icons/MoodForm.vue';
import LifestyleForm from './icons/LifeForm.vue';
import GeneralForm from './icons/SymptomsForm.vue';

// 定义可能的类型
type Nullable<T> = T | null;

const recordText = ref<Nullable<string>>(null);
const moodValue = ref<Nullable<number>>(null);

// 生活习惯相关数据
const height = ref<Nullable<number>>(null);
const weight = ref<Nullable<number>>(null);
// const bodyFat = ref<Nullable<number>>(null);
const sleepHours = ref<Nullable<number>>(null);
const steps = ref<Nullable<number>>(null);
const bmi = ref<Nullable<number>>(null);
const calories = ref<Nullable<number>>(null);

const props = defineProps({
  isVisible: Boolean,
  recordType: String
});

const emit = defineEmits(['close', 'save']);

const close = () => {
  emit('close');
}

const saveRecord = () => {
  let content: any = {};
  if (props.recordType === '心情状态') {
    content = moodValue.value;
  } else if (props.recordType === '生活习惯') {
    content = {
      height: height.value,
      weight: weight.value,
      bmi: bmi.value,
      // bodyFat: bodyFat.value,
      sleepHours: sleepHours.value,
      steps: steps.value,
      calories: calories.value
    };
  } else if (props.recordType === '症状记录') {
    content = recordText.value;
  }
  emit('save', { type: props.recordType, content });
  close();
}

const updateMoodValue = (newValue: unknown) => {
  moodValue.value = newValue as number;
}

const updateHeight = (newValue: unknown) => {
  height.value = newValue as number;
}

const updateWeight = (newValue: unknown) => {
  weight.value = newValue as number;
}

const updateSleepHours = (newValue: unknown) => {
  sleepHours.value = newValue as number;
}

const updateSteps = (newValue: unknown) => {
  steps.value = newValue as number;
}

const updateBmi = (newValue: unknown) => {
  bmi.value = newValue as number;
}

const updateCalories = (newValue: unknown) => {
  calories.value = newValue as number;
}

const updateRecordText = (newText: unknown) => {
  recordText.value = newText as string;
}

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    recordText.value = null;
    height.value = null;
    weight.value = null;
    // bodyFat.value = null;
    sleepHours.value = null;
    steps.value = null;
    bmi.value = null;
    calories.value = null;
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

.nav {
  display: flex;
  justify-content: start;
  align-items: center;
}

.nav-title {
  margin-left: 34vw;
  font-size: 1rem;
  font-weight: bold;
}

.cancel-button {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
}

.modal-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.save-button {
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>