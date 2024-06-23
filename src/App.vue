<template>
  <div id="app">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<script setup>
import { provide, nextTick, ref } from 'vue'

const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>

<style>
html {
  /* 作为基准的像素值 */
  font-size: 16px;
  /* 设置页面背景颜色 */
  background-color: #F4F5F7;
}

/* 其他全局样式 */
</style>