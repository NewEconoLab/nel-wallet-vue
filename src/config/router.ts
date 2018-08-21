import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '../layouts/wallet.vue'
Vue.use(Router)

/**
 * 使用 require 实现按需加载
 */
declare var require: (filename, resolve) => any;
const Balance = Vue.component('Balance', (resolve) => require([ '../pages/balance/balance.vue' ], resolve));
const Login = Vue.component('Login', (resolve) => require([ '../pages/login.vue' ], resolve));
const Transfer = Vue.component('Transfer', (resolve) => require([ '../pages/transfer/transfer.vue' ], resolve));
const Exchange = Vue.component('Exchange', (resolve) => require([ '../pages/exchange/exchange.vue' ], resolve));
const NNSNeo = Vue.component('NNSNeo', (resolve) => require([ '../pages/bid/nnsneo.vue' ], resolve));
const NNS = Vue.component('NNS', (resolve) => require([ '../pages/nns/nns.vue' ], resolve));
const Settings = Vue.component('Settings', (resolve) => require([ '../pages/setting/settings.vue' ], resolve));
const Auction = Vue.component('Auction', (resolve) => require([ '../pages/bid/neoauction.vue' ], resolve));
const MyNeoName = Vue.component('MyNeoName', (resolve) => require([ '../pages/bid/myneo.vue' ], resolve));
const Bonus = Vue.component('Bonus', (resolve) => require([ '../pages/bid/bonus.vue' ], resolve));

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login', component: Login, name: "login"
        },
        {
            path: '/', component: Wallet, name: "index",
            children: [
                { path: 'balance', component: Balance, name: 'balance' },
                { path: 'transfer', component: Transfer, name: 'transfer' },
                { path: 'exchange', component: Exchange, name: 'exchange' },
                { path: 'nnstest', component: NNS, name: 'nnstest' },
                { path: 'setting', component: Settings, name: 'setting' },
                {
                    path: 'nnsneo', component: NNSNeo, name: 'nnsneo',
                    children: [
                        { path: 'auction', component: Auction, name: 'auction' },
                        { path: 'myneoname', component: MyNeoName, name: 'myneoname' },
                        { path: 'bonus', component: Bonus, name: 'bonus' }
                    ]
                },
            ]
        }
    ]
});