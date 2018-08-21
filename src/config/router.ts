import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '../layouts/wallet.vue'
Vue.use(Router)

/**
 * 使用 require 实现按需加载
 */
declare var require: (filename, resolve) => any;
const Balance = resolve => require([ '../pages/balance/balance.vue' ], resolve);
const Login = resolve => require([ '../pages/login.vue' ], resolve);
const Transfer = resolve => require([ '../pages/transfer/transfer.vue' ], resolve)
const Exchange = resolve => require([ '../pages/exchange/exchange.vue' ], resolve);
const NNSNeo = resolve => require([ '../pages/bid/nnsneo.vue' ], resolve);
const NNS = resolve => require([ '../pages/nns/nns.vue' ], resolve);
const Settings = resolve => require([ '../pages/setting/settings.vue' ], resolve);
const Auction = resolve => require([ '../pages/bid/neoauction.vue' ], resolve);
const MyNeoName = resolve => require([ '../pages/bid/myneo.vue' ], resolve);
const Bonus = resolve => require([ '../pages/bid/bonus.vue' ], resolve);

export default new Router({
    mode: 'hash',
    routes: [
        { path: '/', redirect: '/login' },
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
        },
        { path: '*', redirect: '/login' },
    ]
});