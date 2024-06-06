<template>
    <div class="card" :style="{ backgroundColor: card.color }">
        <div class="content-wrap">
            <div class="text">{{ card.content }}</div>
            <font-awesome-icon :icon="card.icon" class="icon" />
            <div class="text">{{ card.status }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Card {
    content: string;
    status: string;
    icon: string[];
    color: string;
}

defineProps<{ card: Card }>();
</script>

<style scoped>
.card {
    width: 300px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: gray;
    text-align: center;
}

.content-wrap {
    display: flex;
    flex-direction: column;
    /* 让内容垂直排列 */
    align-items: center;
    /* 居中对齐 */
    gap: 10px;
    /* 添加内容与图标之间的间距 */
}

.text {
    margin-top: 1vh;
    /* 这里可以添加针对文本的特定样式 */
    font-size: large;
}

.icon {
    margin-top: 10vh;
    font-size: 60px;
    /* 调整图标大小 */
    color: #828282;
    /* 可选：改变图标颜色 */
}
</style>