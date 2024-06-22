<template>
    <div class="tabbardiv">
        <nav class="tabbar">
            <router-link to="/" class="tabbar-item" :class="{ active: $route.path === '/' }">
                <div class="icon-text">
                    <font-awesome-icon :icon="['fas', 'home']" />
                    <span>首页</span>
                </div>
            </router-link>
            <router-link to="/search" class="tabbar-item" :class="{ active: $route.path === '/search' }">
                <div class="icon-text">
                    <font-awesome-icon :icon="['fas', 'search']" />
                    <span>搜索</span>
                </div>
            </router-link>
            <router-link to="/profile" class="tabbar-item" :class="{ active: $route.path === '/profile' }">
                <div class="icon-text">
                    <font-awesome-icon :icon="['fas', 'user']" />
                    <span>我的</span>
                </div>
            </router-link>
        </nav>
    </div>
</template>

<script setup>


</script>

<style scoped>
.tabbar {
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ddd;
}

.tabbar-item {
    padding: 10px 0;
    flex-grow: 1;
    text-align: center;
    text-decoration: none; /* 取消下划线 */
    color: #666; /* 默认颜色，可根据需要修改 */
}

.icon-text {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tabbar-item.active {
    color: #1e90ff;
}
.tabbar-item:active, .tabbar-item:hover {
    color: #1e90ff; /* 点击和悬停时变色，颜色可根据需要修改 */
}



.tabbar-item .fas {
    font-size: 25px;
}
</style>