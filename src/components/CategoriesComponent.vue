<template>
    <div class="categories">
        <h2>分类</h2>
        <div class="grid">
            <div v-for="(category, index) in categories" :key="index" class="grid-item" @click="handleSort(index)">
                <img :src="category.icon" :alt="category.name" />
                <span>{{ category.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref([
    { name: '感染/肿瘤', icon: new URL('@/assets/img/cate1.jpg', import.meta.url).href, categories:["传染病及寄生虫病","肿瘤","其他感染病"]},
    { name: '代谢/内分泌', icon: new URL('@/assets/img/cate2.jpg', import.meta.url).href },
    { name: '系统性疾病', icon: new URL('@/assets/img/cate3.jpg', import.meta.url).href },
    { name: '特定条件', icon: new URL('@/assets/img/cate4.jpg', import.meta.url).href },
    { name: '其他分类', icon: new URL('@/assets/img/cate5.jpg', import.meta.url).href },
    { name: '全部', icon: new URL('@/assets/img/cate6.jpg', import.meta.url).href}
]);

const handleSort = (index) => {
    if (index === 5) {
        router.push({ name: 'results', query: { q: '全部' } });
    } else {
        router.push({ name: 'results', query: { q: "分类：" + categories.value[index].categories } });
    }
};
</script>

<style scoped>
.categories {
    text-align: flex-start;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    justify-content: center;
    margin-top: 16px;
}

.grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 4rem;
    height: 5rem;
    padding: 16px;
    border: 1px solid #E4E7EB;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.grid-item img {
    width: 50px;
    height: 50px;
}

.grid-item span {
    margin-top: 8px;
    font-size: 14px;
width: 80px;
text-align: center;
}
</style>