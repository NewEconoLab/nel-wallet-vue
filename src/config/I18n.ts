import Vue from 'vue'
import cn from "../language/cn"
import en from "../language/en"
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);
let language = localStorage.getItem("language");
if (!language)
{
    var lang = navigator.language;//常规浏览器语言和IE浏览器    
    lang = lang.substr(0, 2);//截取lang前2位字符
    console.log(lang);

    language = (lang == 'zh' ? 'cn' : 'en');
    localStorage.setItem('language', language);
}

/*---------使用语言包-----------*/
export default new VueI18n({
    locale: language,    // 语言标识
    messages: {
        'cn': cn,   // 中文语言包
        'en': en    // 英文语言包
    },
});