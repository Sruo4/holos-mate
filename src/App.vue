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

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
html {
  /* 作为基准的像素值 */
  font-size: 16px;
}
</style>