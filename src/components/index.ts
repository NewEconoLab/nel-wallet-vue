import Bubble from './bubble.vue';
import Hint from './hint.vue';
import Selected from './Selected.vue';
import Spinner from './Spinner.vue';
import Toast from './toast.vue';
import Valert from './Valert.vue';
import Vlink from './VLink.vue';

export default {
    install(Vue)
    {
        Vue.component('bubble-wrap', Bubble);
        Vue.component('v-hint', Hint);
        Vue.component('v-selected', Selected);
        Vue.component('spinner-wrap', Spinner);
        Vue.component('v-toast', Toast);
        Vue.component('v-alert', Valert);
        Vue.component('v-link', Vlink);
    }
}