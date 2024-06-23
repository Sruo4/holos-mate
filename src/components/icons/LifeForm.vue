<template>
    <div class="record-form">
        <div class="card purple-card">
            <h2>填写最近的身高体重</h2>
            <div class="form-group">
                <input type="number" id="height" v-model="height" class="custom-input" placeholder="身高(cm)" />
            </div>
            <div class="form-group">
                <input type="number" id="weight" v-model="weight" class="custom-input" placeholder="体重(kg)" />
            </div>
            <div class="form-group">
                <div class="bmi-result">BMI: {{ bmi }}</div>
            </div>
        </div>
<!-- 
        <div class="card blue-card">
            <h2>填写体脂率</h2>
            <div class="form-group">
                <input type="number" id="body-fat" v-model="bodyFat" class="custom-input" placeholder="体脂率(%)" />
            </div>
        </div> -->

        <div class="card green-card">
            <h2>填写睡眠时长</h2>
            <div class="form-group">
                <input type="number" id="sleep-hours" v-model="sleepHours" class="custom-input" placeholder="睡眠时长(小时)" />
            </div>
        </div>

        <div class="card orange-card">
            <h2>填写步数</h2>
            <div class="form-group">
                <input type="number" id="steps" v-model="steps" class="custom-input" placeholder="步数" />
            </div>
            <div class="calories-result">消耗卡路里: {{ calories }} 卡</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const height = ref<number | string>('');
const weight = ref<number | string>('');
const bodyFat = ref<number | string>('');
const sleepHours = ref<number | string>('');
const steps = ref<number | string>('');
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
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
}

.card {
    width: 18.5rem;
    height: 6rem;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.purple-card {
    background: #e6e6fa;
    height: 12rem;
}

.blue-card {
    background: #add8e6;
}

.green-card {
    background: #d0f0c0;

}

.orange-card {
    background: #ffd580;
    height: 8.5rem;
}

h2 {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
    color: #555;
}

.custom-input {
    width: 70vw;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
}

.custom-input:focus {
    border-color: #007bff;
    outline: none;
}

.bmi-result,
.calories-result {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: #333;
}
</style>