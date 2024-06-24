<template>
    <div class="search-page">
        <header>
            <h1>知识库</h1>
        </header>

        <TwelveHourHealth />

        <SearchForm />



        <Categories />
    </div>
</template>

<script setup>
import TwelveHourHealth from '../components/TwelveHourHealth.vue';
import SearchForm from '../components/SearchForm.vue';
import Categories from '../components/CategoriesComponent.vue';


</script>

<style scoped>
.search-page {
    height: 80vh;
    padding: 2rem;
}

h1 {
    margin: 0;
    font-size: 30px;
}


</style>