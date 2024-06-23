<template>
    <div class="search-form">
        &nbsp;
        <FontAwesomeIcon icon="search" />&nbsp;
        <input type="text" v-model="query" placeholder="输入关键词" />
        <button @click="search">搜索</button>
    </div>
    <div class="message-container">
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
        </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const query = ref('');
const router = useRouter();

const errorMessage = ref('');

const search = () => {
    if (query.value.trim()) {
        errorMessage.value = '';
        router.push({ name: 'results', query: { q: query.value } });
    } else {
        errorMessage.value = '请输入关键词进行搜索';
    }
};
</script>

<style scoped>
.search-form {
    margin-top: 2rem;
    border-radius: 12px;
    height: 6vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
    width: 75%;
    border: none;
    padding: 8px;
    font-size: 16px;
    outline: none;
    background-color: inherit;
}

button {
    padding: 8px;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    background-color: inherit;
    outline: none;
    width: 20%;
}

.message-container {
    margin-top: 8px;
    height: 1.5rem;
}

.error-message {
    color: red;
}
</style>