<template>
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">索引</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">概览</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
const active = 'home';
</script>