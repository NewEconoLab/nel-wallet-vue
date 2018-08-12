import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from "./language/cn"
import en from "./language/en"
import Login from './pages/login.vue'
import Balance from './pages/balance/balance.vue'
import Transfer from './pages/transfer/transfer.vue';
import Exchange from './pages/exchange/exchange.vue';
import NNSNeo from './pages/bid/nnsneo.vue';
import NNS from './pages/nns/nns.vue';
import Settings from './pages/setting/settings.vue';
import { tools } from "./tools/importpack";
import { TaskManager } from './tools/taskmanager';
import components from './components/index';
import { TaskFunction } from './tools/entity';

Vue.use(VueI18n);
Vue.use(components);
// const notFound = () => import('./pages/404.vue');
declare var require: (filename, resolve) => any;
Vue.config.productionTip = false
const notFound = Vue.component('notFound', (resolve) => require([ './pages/404.vue' ], resolve));
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
// i18n.locale = language;
// app.$i18n.locale = language;


var app = new Vue({
    el: '#app',
    i18n,
    data: {
        currentRoute: window.location.hash
    },
    components,
    computed: {
        ViewComponent()
        {
            let routeArray = (this.currentRoute as string).replace("#", "").split("/")
            let route = routeArray[ 0 ];
            let subroute = routeArray.length > 1 ? routeArray[ 1 ] : undefined;
            switch (route)
            {
                case "balance":
                    return Balance;
                case "login":
                    return Login;
                case "transfer":
                    return Transfer;
                case "exchange":
                    return Exchange;
                case "nnsneo":
                    return NNSNeo;
                case "nns":
                    return NNS;
                case "settings":
                    return Settings;
            }
            return notFound;
        }
    },
    render(h)
    {
        return h(this.ViewComponent)
    }
});

window.addEventListener('popstate', () =>
{
    app.currentRoute = window.location.hash;
})
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
