<template>
  <div id="app">
    <router-view></router-view>
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { provide, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})

const route = useRoute()
const showTabBar = ref(true)

// 监听路由变化，根据元信息决定是否显示TabBar
watch(route, () => {
  showTabBar.value = !route.meta.hideTabBar
}, { immediate: true })
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