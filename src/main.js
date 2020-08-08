import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/common/common.less'

// 全局引入vant组件
import {Toast} from "vant";
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
;
