import VueRouter from 'vue-router';
import routes from "./routersConfig"
import store from "../store/index";
import { tool } from "../libs/Tool";
import WXFN from "../store/wxFn"
const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
   
      return { x: 0, y: 0 }
    },
    routes:routes.map((item,index)=>{
      if(!item.meta){
        item.meta={}
      }
      item.meta.index=index
      return item
    })
})
router.beforeEach((to, from, next) => {
  console.log(to)
   console.log('跳转之前',window.location.href)
  document.title = to.meta.title ||'医阶'
   
  //  //判断是否登录注册
  //  if(!store.getters.getToken){
  //       store.dispatch('wxLogin',next)
  //  }
  //  else
  //  {
    
  //    next()
  //  }
   next()
})
router.afterEach((to,from)=>{
   
    console.log(to)
    console.log('跳转之后',window.location.origin+to.fullPath)
    // if(!tool.isIos())
    // {
      
    //   WXFN.InitJsTicket(window.location.origin+to.fullPath)
    // }
    // else
    // {
    //   // setTimeout(()=>{
    //   //   WXFN.InitJsTicket(window.location.origin+to.fullPath)
    //   // },2000)
 
    // }
    //WXFN.InitJsTicket(window.location.origin+to.fullPath)
  
    console.log(tool.isIos())
    
})
export default router