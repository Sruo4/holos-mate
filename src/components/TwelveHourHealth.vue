<template>
    <div class="health-12-hours">
        <p>十二时辰养生</p>
        <div>
            {{ health12Hours }} {{ hoursDesc }} 养生
        </div>
        <p>{{ healthTips }}</p>
    </div>
</template>

<script setup>
const now = new Date();
const hour = now.getHours();
const timeInfo = [
    { period: '子时', range: '(23:00 - 01:00)', tip: '子时是人体肾经的主时，此时肾气最旺，适合休息养生。' },
    { period: '丑时', range: '(01:00 - 03:00)', tip: '丑时是人体胃经的主时，此时胃气最旺，适合进食。' },
    { period: '寅时', range: '(03:00 - 05:00)', tip: '寅时是人体肝经的主时，此时肝气最旺，适合运动。' },
    { period: '卯时', range: '(05:00 - 07:00)', tip: '卯时是人体胆经的主时，此时胆气最旺，适合学习。' },
    { period: '辰时', range: '(07:00 - 09:00)', tip: '辰时是人体脾经的主时，此时脾气最旺，适合工作。' },
    { period: '巳时', range: '(09:00 - 11:00)', tip: '巳时是人体心经的主时，此时心气最旺，适合交流。' },
    { period: '午时', range: '(11:00 - 13:00)', tip: '午时是人体小肠经的主时，此时小肠气最旺，适合午休。' },
    { period: '未时', range: '(13:00 - 15:00)', tip: '未时是人体胃经的主时，此时胃气最旺，适合进食。' },
    { period: '申时', range: '(15:00 - 17:00)', tip: '申时是人体大肠经的主时，此时大肠气最旺，适合排便。' },
    { period: '酉时', range: '(17:00 - 19:00)', tip: '酉时是人体肺经的主时，此时肺气最旺，适合呼吸。' },
    { period: '戌时', range: '(19:00 - 21:00)', tip: '戌时是人体肾经的主时，此时肾气最旺，适合休息养生。' },
    { period: '亥时', range: '(21:00 - 23:00)', tip: '亥时是人体膀胱经的主时，此时膀胱气最旺，适合睡眠。' }
];

const currentPeriod = timeInfo[Math.floor(hour / 2)];
const health12Hours = currentPeriod.period;
const hoursDesc = currentPeriod.range;
const healthTips = currentPeriod.tip;
</script>

<style scoped>
.health-12-hours {
    margin-top: 16px;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
}

.health-12-hours p:first-child {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
</style>