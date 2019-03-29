import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '../layouts/wallet.vue'
Vue.use(Router)

/**
 * 使用 require 实现按需加载
 */
declare var require: (filename, resolve) => any;
const Balance = resolve => require(['../pages/balance/balance.vue'], resolve);
const Login = resolve => require(['../pages/login.vue'], resolve);
const Transfer = resolve => require(['../pages/transfer/transfer.vue'], resolve)
const Exchange = resolve => require(['../pages/exchange/exchange.vue'], resolve);
const NNSNeo = resolve => require(['../pages/bid/nnsneo.vue'], resolve);
const Settings = resolve => require(['../pages/setting/settings.vue'], resolve);
const Auction = resolve => require(['../pages/bid/neoauction.vue'], resolve);
const MyNeoName = resolve => require(['../pages/bid/myneo.vue'], resolve);
const Bonus = resolve => require(['../pages/bid/bonus.vue'], resolve);
const NNSTest = resolve => require(['../pages/bidtest/nnstest.vue'], resolve);
const AuctionTest = resolve => require(['../pages/bidtest/neoauction.vue'], resolve);
const MyTestName = resolve => require(['../pages/bidtest/myneo.vue'], resolve);
const BonusTest = resolve => require(['../pages/bidtest/bonus.vue'], resolve);
const Tutorial = resolve => require(['../pages/bid/tutorial.vue'], resolve);
const TutorialTest = resolve => require(['../pages/bidtest/tutorial.vue'], resolve);

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
                {
                    path: 'nnstest', component: NNSTest, name: 'nnstest',
                    children: [
                        { path: 'auction', component: AuctionTest, name: 'auctiontest' },
                        { path: 'mytestname', component: MyTestName, name: 'mytestname' },
                        { path: 'bonus', component: BonusTest, name: 'bonustest' },
                        { path: 'tutorial', component: TutorialTest, name: 'tutorial' }
                    ]
                },
                { path: 'setting', component: Settings, name: 'setting' },
                {
                    path: 'nnsneo', component: NNSNeo, name: 'nnsneo',
                    children: [
                        { path: 'auction', component: Auction, name: 'auction' },
                        { path: 'myneoname', component: MyNeoName, name: 'myneoname' },
                        { path: 'bonus', component: Bonus, name: 'bonus' },
                        { path: 'tutorial', component: Tutorial, name: 'tutorial' }
                    ]
                },
            ]
        },
        { path: '*', redirect: '/login' },
    ]
});