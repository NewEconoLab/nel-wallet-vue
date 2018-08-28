import Vue from 'vue'
import { tools } from "./tools/importpack";
import { TaskManager } from './tools/taskmanager';
import components from './components/index';
import { TaskFunction } from './tools/entity';
import App from './pages/app.vue'
import router from './config/router'
import i18n from './config/I18n'

Vue.use(components);

// const notFound = () => import('./pages/404.vue');
Vue.config.productionTip = false

new Vue({
    el: '#app',
    i18n,
    render: h => h(App),
    router,
    components
});


//初始化鼠标随机方法
Neo.Cryptography.RandomNumberGenerator.startCollectors();
//初始化根域名
tools.nnstool.initRootDomain("neo");
tools.nnstool.initRootDomain("test");
// console.log(tools.nnstool.root_neo.register.toString());


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
