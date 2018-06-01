import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from "./language/cn"
import en from "./language/en"
import Login from './pages/login.vue'
import Balance from './pages/balance/balance.vue'
import Wallet from './layouts/wallet.vue'
import Transfer from './pages/transfer/transfer.vue';
import NNSNeo from './pages/bid/nnsneo.vue';
import NNS from './pages/nns/nns.vue';
import Settings from './pages/setting/settings.vue';
import { CoinTool } from './tools/cointool';
import { StorageTool } from './tools/storagetool';

Vue.use(VueI18n);
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
    computed: {
        ViewComponent()
        {
            switch (this.currentRoute)
            {
                case "#balance":
                    return Balance;
                case "#login":
                    return Login;
                case "#transfer":
                    return Transfer;
                case "#nnsneo":
                    return NNSNeo;
                case "#nns":
                    return NNS;
                case "#settings":
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