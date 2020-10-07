import Directive from "./directive"
import Components from "./components"
import Alert from "./alert.js"
import {tool} from "../libs/Tool"
let Obj={
    install:function(Vue,option){
    
       //添加指令
       Directive(Vue)
       //通用组件
       Components(Vue)
       //全局注册
       Alert(Vue)
       Vue.prototype.$tool = tool;
    }
  }
  export default Obj