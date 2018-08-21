import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from "./language/cn"
import en from "./language/en"
import { tools } from "./tools/importpack";
import { TaskManager } from './tools/taskmanager';
import components from './components/index';
import { TaskFunction } from './tools/entity';
import VueRouter from 'vue-router';
// import Login from './pages/login.vue'
// import Transfer from './pages/transfer/transfer.vue'
// import Balance from './pages/balance/balance.vue'
import App from './pages/app.vue'
import Wallet from './layouts/wallet.vue'

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(components);

// const notFound = () => import('./pages/404.vue');

declare var require: (filename, resolve) => any;
Vue.config.productionTip = false

/**
 * 使用 require 实现按需加载
 */
const Balance = Vue.component('Balance', (resolve) => require([ './pages/balance/balance.vue' ], resolve));
const Login = Vue.component('Login', (resolve) => require([ './pages/login.vue' ], resolve));
const Transfer = Vue.component('Transfer', (resolve) => require([ './pages/transfer/transfer.vue' ], resolve));
const Exchange = Vue.component('Exchange', (resolve) => require([ './pages/exchange/exchange.vue' ], resolve));
const NNSNeo = Vue.component('NNSNeo', (resolve) => require([ './pages/bid/nnsneo.vue' ], resolve));
const NNS = Vue.component('NNS', (resolve) => require([ './pages/nns/nns.vue' ], resolve));
const Settings = Vue.component('Settings', (resolve) => require([ './pages/setting/settings.vue' ], resolve));
const notFound = Vue.component('notFound', (resolve) => require([ './pages/404.vue' ], resolve));
// // const Wallet = Vue.component('Wallet', (resolve) => require([ './layout/wallet.vue' ], resolve));

let language = sessionStorage.getItem("language");
!!language ? language : language = 'en';
/*---------使用语言包-----------*/
const i18n = new VueI18n({
    locale: language,    // 语言标识
    messages: {
        'cn': cn,   // 中文语言包
        'en': en    // 英文语言包
    },
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: Login,
        },
        {
            path: '/wallet', component: Wallet,
            children: [
                { path: 'balance', component: Balance },
                { path: 'transfer', component: Transfer },
                { path: 'exchange', component: Exchange },
                { path: 'nnsneo', component: NNSNeo },
                { path: 'nns', component: NNS },
                { path: 'setting', component: Settings },
            ]
        }
    ]
})

new Vue({
    el: '#app',
    i18n,
    render: h => h(App),
    router,
    components
});


//初始化鼠标随机方法
Neo.Cryptography.RandomNumberGenerator.startCollectors();

setInterval(() =>
{
    let oldBlock = new tools.sessionstoretool("block");
    tools.wwwtool.api_getHeight()
        .then((data) =>
        {
            let oldHeight = oldBlock.select("height");
            if (oldHeight)
            {
                if (data > oldHeight)
                {
                    oldBlock.put("height", data);
                    /**
                     * 高度变化放在最开始高度变化就启动高度刷新
                     */
                    if (TaskFunction.heightRefresh)
                    {
                        TaskFunction.heightRefresh();
                    }
                    TaskManager.update();
                }
            } else
            {
                oldBlock.put("height", data);
            }
        })
}, 15000);
