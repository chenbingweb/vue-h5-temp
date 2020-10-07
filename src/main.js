import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import  axioscfg  from "./config/axios.config.js"
import { Tabbar, TabbarItem ,Toast,Button,Notify,Dialog} from 'vant';
import '@babel/polyfill';
import 'lib-flexible';

import Vconsole from 'vconsole'
import router from "./routers";
import VueRouter from 'vue-router';
import Interface from "./interface";
import Libs from "./libs";
import WXConfig from "./wxConfig"
import Comm from "./comm"
// import vau from "vue-ant-util"
import store from './store/index' //引入状态管理 store

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'http://4dcb39a7e00d4cc7b224de3753e74c02@sentry.jeemoo.com/8',
  integrations: [new Integrations.Vue({Vue, attachProps: true})],
});

if(process.env.VUE_APP_DEBUG=='1' )
{
  
  new Vconsole()
}
console.log("################")
console.log('process.env.VUE_APP_DEBUG',process.env.VUE_APP_DEBUG.trim().length,process.env.VUE_APP_DEBUG=='1')
// new Vconsole()
axioscfg(axios)
//添加微信插件
Vue.use(WXConfig)
//通用
Vue.use(Comm)
// Vue.use(vau)
Vue.use(Libs)
Vue.use(Toast);
Vue.use(Button);
Vue.use(Dialog);
// 路由配置
Vue.use(VueRouter)
//vant 组件全局注册
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Interface)

Vue.config.productionTip = false;
let loading = null;
//创建VUE实例
function createApp(){
  var _vue = new Vue({
    router,
    store,
    render: h => h(App),
  })
  _vue.$mount('#app')
  if(loading)
  {
    loading.clear()
  }
}
   //createApp()



if(store.getters.getToken)
{
  
  createApp()
}
else
{
  loading = Toast.loading('登录中...');
  store.dispatch('appLogin',{next:()=>{
   
    createApp()
  },
  store
  })
}



