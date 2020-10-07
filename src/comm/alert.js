import {Toast,Notify} from 'vant';
export default function Alert(Vue){
    //警告提示
    Vue.prototype.$alert = function (message) {
        Notify({  className:'_loading_',type: 'warning', message: message||'通知内容' });
    }
    //加载  toast.clear()
    Vue.prototype.$loading=function(param={}){
        let opt={
            message:param.message || '加载中...',
            forbidClick:param.mask,
            duration:0,
            className:'_loading_'
          }
        // opt = Object.assign(opt,param)
       return Toast.loading(opt);
    }
    //成功提示
    Vue.prototype.$success=function(param={}){
        let opt={
            message:param.message || '成功',
            forbidClick:param.mask,
            // duration:0,
            type:'success',
            className:'_loading_'
          }
        // opt = Object.assign(opt,param)
       return Toast.loading(opt);
    }
    //失败提示
    Vue.prototype.$fail=function(param={}){
        let opt={
            message:param.message || '失败',
            forbidClick:param.mask,
            type:'fail',
            className:'_loading_'
          }
        // opt = Object.assign(opt,param)
       return Toast.loading(opt);
    }
    //错误提示
    Vue.prototype.$err=function(param={}){
        let opt={
            message:param.message || '加载失败',
            forbidClick:param.mask,
            // duration:0,
            icon:'cross',
            type:'fail'
          }
        // opt = Object.assign(opt,param)
       return Toast.loading(opt);
    }
    //文字提示
    Vue.prototype.$tip=function(msg){
        Toast(msg||'提示内容');
    }
}

