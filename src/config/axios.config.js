import {baseUrl} from "./index.js"
import qs from 'qs'
import { Toast } from 'vant';
function AxioConfig(axios) {
  console.log(axios.defaults.headers)
  let toast = null;
  axios.defaults.timeout = 5000; //响应时间
  //application/json; charset=utf-8
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
  axios.defaults.baseURL = baseUrl  //配置接口地址
  //POST传参序列化(添加请求拦截器)
  axios.interceptors.request.use((config) => {
    if(!config.data.hidden)
    {
      toast = Toast.loading({
        message: config.data.loading || '加载中...',
        forbidClick: true
      });
    }
    
   
    //在发送请求之前做某件事
    if(config.method  === 'post'){
      config.data = qs.stringify(config.data);
    }
    return config;
  },(error) =>{
    Toast({
      mes: '错误的传参',
      timeout: 1500
    });
    return Promise.reject(error);
  });

//返回状态判断(添加响应拦截器)
  axios.interceptors.response.use((res) =>{
    if(toast)
    {
      toast.clear()
    }
    
    //对响应数据做些事
    if(parseInt(res.data.errcode)==0){

      return res;
     
    }
    else if(parseInt(res.data.errcode)==1){
          //开发环境
          if(process.env.NODE_ENV== "development")
          {
            Promise.reject(res);
          }
          else
          {
            //登录失败后跳转微信登录
            window.location.href=res.data.data.url
          }
    } 
    else{
      Toast(res.msg|| '服务器繁忙');
      
      return Promise.reject(res);
    }
    
  }, (error) => {
    Toast(res.msg|| '服务器繁忙');
    return Promise.reject(error);
  });

}
export default AxioConfig




