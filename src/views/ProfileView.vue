<template>
    <div>
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="https://avatars.githubusercontent.com/u/204768?v=4" alt="头像" />
            </div>
            <div class="profile-info">
                <div class="profile-username">用户名</div>
                <div class="self-intro">个人简介</div>
            </div>
        </div>
        <!-- 个人健康数据 -->
        <div class="profile-data">
            <div class="psychological-condition">
                <div class="card-title">心理状态</div>
                <div class="card-content">心理状态数据</div>
            </div>
            <div class="data-set">
                <div class="card-title">体征数据</div>
                <div class="card-content">体征数据</div>
            </div>
            <div class="symptoms">
                <div class="card-title">症状</div>  
                <div class="card-content">症状数据</div>  
            </div>
        </div>
        


    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.profile-header {
    display: flex;
    padding: 1rem;
}

.profile-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.profile-info {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.profile-username {
    font-size: 1.5rem;
    font-weight: bold;
}

.self-intro {
    font-size: 1rem;
    color: #828282;
}

.profile-data {
    padding: 1rem;
    /* width: 100%; */
    
}

.psychological-condition, .data-set, .symptoms {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    height: 10vh;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-content {
    font-size: 1rem;
    color: #828282;
}





</style>