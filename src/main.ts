import Vue from 'vue'
import Home from './pages/home.vue'
import About from './pages/about.vue'
import Login from './pages/login.vue'

// const notFound = () => import('./pages/404.vue');
declare var require : (filename,resolve)=>any;
Vue.config.productionTip = false
const notFound= Vue.component('notFound',(resolve) => require(['./pages/404.vue'], resolve));

var app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.hash
    },
    computed: {
        ViewComponent() {
            switch (this.currentRoute) {
                case "#wallet":
                    return Home;
                case "#login":
                    return Login;
            }
            return notFound;
        }
    },
    render(h) {
        return h(this.ViewComponent)
    }
});

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.hash
})