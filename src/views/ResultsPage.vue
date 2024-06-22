<template>
    <div class="results-page">
        <header>
            <h1>搜索结果 "{{ $route.query.q }}"</h1>
        </header>
        <section class="results">
            <div v-for="result in results" :key="result.id" class="result-item" @click="goToDetail(result.id)">
                <p>{{ result.name }}</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const results = ref([]);
const route = useRoute();
const router = useRouter();

// 从后端数据库获取数据
const fetchResults = async () => {
    if (!route.query.q) {
        results.value = [];
        return;
    }

    try {
        const response = await axios.get('/api/search', {
            params: {
                keyword: route.query.q
            }
        });
        results.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const goToDetail = (id) => {
    router.push({ path: '/detail', query: { id } });
};

onMounted(fetchResults);
watch(() => route.query.q, fetchResults);

</script>

<style scoped>
.results-page {
    padding: 16px;
    text-align: center;
}

h1 {
    font-size: 24px;
}

.results {
    margin-top: 16px;
}

.result-item {
    padding: 8px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}
</style>