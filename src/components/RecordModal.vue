<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button @click="close">取消</button>
      <h2>{{ recordType }}</h2>      
      <div v-if="recordType === '心情状态'" class="record-form">
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
        <input type="range" v-model="moodValue" min="0" max="100" @input="updateFlower" />
      </div>

      <div v-if="recordType === '生活习惯'" class="record-form">
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

      <textarea v-if="recordType !== '心情状态' && recordType !== '生活习惯'" v-model="recordText" placeholder="请输入记录内容"></textarea>
      <button @click="saveRecord">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const recordText = ref('');
const moodValue = ref(50); // 初始化心情值

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

const petalStyle = computed(() => {
  const color = getColorFromMood(moodValue.value);
  const scale = moodValue.value / 100 + 0.5;
  return {
    backgroundColor: color,
    transform: `scale(${scale})`
  };
});

const moodDescription = computed(() => {
  const value = moodValue.value;
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

const getColorFromMood = (value) => {
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

const calculateBMI = () => {
  if (height.value > 0 && weight.value > 0) {
    bmi.value = (weight.value / ((height.value / 100) ** 2)).toFixed(2);
  }
};

const calculateCalories = () => {
  calories.value = (steps.value * 0.04).toFixed(2); // 假设每步消耗0.04卡路里
};

const updateFlower = () => {
  // 更新花瓣样式
};
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

.record-form {
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

.bmi-result, .calories-result {
  margin: 0.5rem 0;
}
</style>