<template>
    <div class="detail-page">
        <header>
            <!-- 返回导航 -->
            <div @click="goBack">
                <font-awesome-icon :icon="['fas', 'angle-left']" />
                分类
            </div>
            <h1>{{ $route.query.q }}</h1>
        </header>
        <section v-if="detail">
            <h2>{{ detail.name }}</h2>
            <img v-if="detail.image_url" :src="detail.image_url" alt="detail.name" />
            <p>{{ detail.description }}</p>
            <!-- 其他详细信息 -->
        </section>
        <section v-else>
            <p>正在加载...</p>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const detail = ref(null);
const route = useRoute();

// 从后端数据库获取详情数据
const fetchDetail = async () => {
    const id = route.query.id;
    console.log(id);
    if (!id) {
        detail.value = null;
        return;
    }
    try {
        const response = await axios.get(`/api/detail/${id}`);
        detail.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const goBack = () => {
    window.history.back();
};

onMounted(fetchDetail);

</script>

<style scoped>
.detail-page {
    padding: 2rem;
    text-align: center;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h1 {
    font-size: 24px;
}

section {
    margin-top: 16px;
}
</style>