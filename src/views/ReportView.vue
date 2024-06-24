<template>
    <div class="report-container">
        <div class="header" @click="goBack">
            <font-awesome-icon :icon="['fas', 'angle-left']" class="back-icon"/>
            <span>分类</span>
        </div>
        <h1 class="title">今日报告</h1>
        <div class="dialogBox">
            <div v-if="loading" class="loading">报告生成中...</div>
            <div v-else>
                <div v-for="(chatContent, index) in finalChat" :key="index" class="chat-bubble">
                    <p>{{ chatContent.ai }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuthStore } from '@/stores/auth';

const goBack = () => {
    window.history.back();
};

const appId = 'fd5febfc';
const apiKey = '773a44265c1cd92fc355ebc4d6196555';
const apiSecret = 'MmZlNDgzMTEwMmRmMzRlN2NhOTdiNDkx';
const url = 'wss://spark-api.xf-yun.com/v1.1/chat'; // 星火大模型1.x版本

interface ChatContent {
  ai: string;
}

const finalChat = ref<ChatContent[]>([]);
const loading = ref(false);
const ttsWS = ref<WebSocket | null>(null);
const aiContentRequest = ref('');
interface FetchedData {
  lifeRecord: {
    height: number;
    weight: number;
    sleep_hours: number;
    steps: number;
  };
  symptomRecord: {
    description: string;
  };
  moodRecord: {
    eval_value: number;
  };
}

const fetchedData = ref<FetchedData | null>(null);

const authStore = useAuthStore();

onMounted(() => {
    fetchDataAndStart();
});

const fetchDataAndStart = async () => {
    try {
        // 根据uuid 获取最新的症状记录
        const uuid = authStore.user?.uuid;
        // 设置get请求的url.params为uuid
        const response = await axios.get(`/api/symptom-record/${uuid}`);
        fetchedData.value = response.data;
        console.log(fetchedData.value);
        console.log(fetchedData.value?.lifeRecord);
        start();
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

const getWebsocketUrl = (): Promise<string> => {
    return new Promise((resolve) => {
        const host = window.location.host;
        const date = new Date().toUTCString();
        const algorithm = 'hmac-sha256';
        const headers = 'host date request-line';
        const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
        const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
        const signature = CryptoJS.enc.Base64.stringify(signatureSha);
        const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
        const authorization = window.btoa(authorizationOrigin);
        const finalUrl = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
        resolve(finalUrl);
    });
};

const connectWebSocket = () => {
    getWebsocketUrl().then((url: string) => {
        if ('WebSocket' in window) {
            ttsWS.value = new WebSocket(url);
        } else {
            alert('浏览器不支持WebSocket');
            return;
        }

        if (ttsWS.value) {
            ttsWS.value.onopen = () => {
                webSocketSend();
            };

            ttsWS.value.onmessage = (e: { data: any; }) => {
                result(e.data);
            };

            ttsWS.value.onerror = () => {
                alert('WebSocket报错，请f12查看详情');
            };

            ttsWS.value.onclose = (e: any) => {
                console.log(e);
            };
        }
    });
};

const webSocketSend = () => {
    const params = {
        header: {
            app_id: appId,
            uid: '123456',
        },
        parameter: {
            chat: {
                domain: 'general',
                temperature: 0.5,
                max_tokens: 1024,
            },
        },
        payload: {
            message: {
                text: [
                    {
                        role: "user",
                        content: `请根据以下数据生成中医分析：症状：${fetchedData.value?.symptomRecord.description}
                        心情评分（满分100）：${fetchedData.value?.moodRecord.eval_value}
                        今日数据：身高：${fetchedData.value?.lifeRecord.height}cm，体重：${fetchedData.value?.lifeRecord.weight}kg，
                        睡眠时长：${fetchedData.value?.lifeRecord.sleep_hours}小时，步数：${fetchedData.value?.lifeRecord.steps}

                        仅根据以上数据生成简单的中医分析。
                        `
                    }
                ]
            }
        }
    };

    if (ttsWS.value) {
        ttsWS.value.send(JSON.stringify(params));
    }
};

const requestHandle = (requestData: { payload: { choices: { text: string | any[]; }; }; }) => {
    if (requestData && requestData.payload && requestData.payload.choices && requestData.payload.choices.text && requestData.payload.choices.text.length > 0) {
        aiContentRequest.value += requestData.payload.choices.text[0].content;
    }
};

const result = (resultData: string) => {
    const jsonData = JSON.parse(resultData);

    if (jsonData.header.code !== 0) {
        alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`);
        return;
    }

    if (jsonData.header.status !== 2) {
        requestHandle(jsonData);
    } else {
        requestHandle(jsonData);
        finalChat.value.push({
            ai: aiContentRequest.value,
        });
        loading.value = false;
        if (ttsWS.value) {
            ttsWS.value.close();
        }
    }
};

const start = () => {
    loading.value = true;
    aiContentRequest.value = '';
    connectWebSocket();
};
</script>

<style>
.report-container {
    padding: 1rem;
    text-align: start;
    background-color: #f7f8fa;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    cursor: pointer;
}

.back-icon {
    margin-right: 0.5rem;
}

.title {
    font-size: 1.5rem;
    margin: 0;
    color: #333;
}

.dialogBox {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
    margin-top: 1rem;
    color: #828282;
}

.chat-bubble {
    background: #e9f5ff;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>