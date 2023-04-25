import { createApp, watch, ref } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/es/components/loading/style/css';
import { ElLoading } from 'element-plus';
import App from './App.vue';
import './assets/main.css';

import installIcon from '@/plugins/installIcon'; // icon 注册
import installRouter from '@/plugins/installRouter'; // 路由注册
import installPiniaPlugin from '@/plugins/installPiniaPlugin'; // Pinia 状态监控
import installFFmpeg from '@/plugins/installFFmpeg'; // ffmpeg 集成

const app = createApp(App);
app.config.globalProperties.$showLoading = ref(false);
app.config.globalProperties.$ElLoading = ElLoading.service({
    text: '核心加载中...'
});

const pinia = createPinia();
pinia.use(installPiniaPlugin);

app.use(pinia);
app.use(installRouter);
app.use(installIcon);
app.use(installFFmpeg);

app.mount('#app');
