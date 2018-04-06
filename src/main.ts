import Vue from 'vue'
import Home from './pages/home.vue'
import About from './pages/about.vue'
import Login from './pages/login.vue'
import Balance from './pages/balance.vue'
import Wallet from './layouts/wallet.vue'
import Transfer from './pages/transfer.vue';
import NNS from './pages/nns.vue';
import Settings from './pages/settings.vue';
import { CoinTool } from './tools/cointool';

// const notFound = () => import('./pages/404.vue');
declare var require: (filename, resolve) => any;
Vue.config.productionTip = false
const notFound = Vue.component('notFound', (resolve) => require([ './pages/404.vue' ], resolve));

var app = new Vue({
    el: '#app',
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