<template>
    <div class="results-page">
        <header>
            <!-- 返回导航 -->
            <div @click="goBack">
                <font-awesome-icon :icon="['fas', 'angle-left']" />
                分类
            </div>
            <h1>{{ $route.query.q }}</h1>
        </header>
        <section class="results">
            <div v-for="result in results" :key="result.id" class="result-item" @click="goToDetail(result.id)">
                <!-- 结果卡片 -->
                 <div class="result-card">
                    <div class="result-image" v-if="result.image_url">
                        <img :src="result.image_url" alt="result.name" />
                    </div>
                    <div class="result-info">
                        <p class="result-name">{{ result.name }}</p>
                        <p class="result-description">{{ result.description }}</p>
                        <button>查看详情</button><button>记录</button>
                    </div>
                 </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

const goBack = () => {
    // 返回上一页
    router.back();
    
};

const goToDetail = (id) => {
    router.push({ path: '/detail', query: { id } });
};

onMounted(fetchResults);
watch(() => route.query.q, fetchResults);

</script>

<style scoped>
.results-page {
    padding: 2rem;
    /* text-align: center; */
}

header {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

h1 {
    font-size: 2rem
}

.results {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.result-item {
    /* padding: 8px; */
    cursor: pointer;
    flex: 1 0 250px;
    margin: 8px 0;
}

.result-card {
    /* border: 1px solid #ddd; */
    background-color: white;
    border-radius: 8px;
    height: 120px;
    padding: 16px;
    display: flex;
    /* align-items: center; */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
}

.result-card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.result-image img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 16px;
}

.result-info {
    flex: 1;
    text-align: left;
}

.result-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.result-description {
    font-size: 14px;
    color: #666;
    margin: 8px 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 倒数第二个按钮 */
button:nth-last-child(2) {
    margin: 8px 8px 0 0;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #FEDE33;
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
}

button:last-child {
    margin: 8px 8px 0 0;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    /* background-color: #FEDE33; */
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
}
</style>