import axios from 'axios'
const querystring = require('querystring');
import {Toast} from 'vant';

export default class Tool {
  constructor() {
    let uuid= this.GetUrlPara('uuid');
    if(localStorage.getItem('uuid')=='null'||!localStorage.getItem('uuid'))
    {
        uuid = this.GetUrlPara('uuid');
        localStorage.setItem('uuid',uuid)
    }
    else
    {
        uuid =localStorage.getItem('uuid');
    }
    this.uuid = uuid;
    this.token ='';//a603de1b-8f63-11ea-808a-00163e128716  process.env.NODE_ENV=='development'?'a603de1b-8f63-11ea-808a-00163e128716':
    if(!uuid)
    {
      console.error('url传uuid参数')
    }
    console.log('UUID',uuid)
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
    console.log('process.env.BASE_URL:', process.env.VUE_APP_URL)
    console.log('process.env.DEBUG',process.env.VUE_APP_DEBUG)
    this.config ={
        //基础URL
         baseURL: process.env.VUE_APP_URL, 
         //请求延时时间
         timeout:2000, 
        //自定义请求头内容
         headers:{
          //'content-type':'application/x-www-form-urlencoded;charset=UTF-8' ,
          // 'content-type':'application/json;charset=UTF-8',
           'Channel-Uuid':this.uuid,
           token:this.token
         }, 
          //请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
         responseType: 'json', 
         //无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
         params: {},  
         transformRequest: [function(data){
          return querystring.stringify(data);
         }],   // 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
         transformResponse: [function(data){
             console.log('data',data)
             if(data.code==0)
             {
               return data
             }
             else if(data.code==-2)
            {
              return data
            }
             else
             {
               //开发环境
              if(process.env.NODE_ENV== "development")
              {
                 return data
              }
              
              else
              {
                //登录失败后跳转微信登录
                // window.location.href=data.data.url
              }
             }
            
         }],   //transformResponse` 在传递给 then/catch 前，允许修改响应数据
         validateStatus: function(status){
         　　return status < 400 //状态码小于400时均为成功（返回true）
         }, //validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
           //取消请求，下文详细说明
    }
    //this.config
    this.axios = axios.create(this.config) 
    

  }
  setToken(val){
    this.token = val;
    console.log(this.token )
  }
  //返回一个Promise(发送post请求)
  fetchPost(url, params = {},token) {
    params = Object.assign({
      //  device:'wx'
    }, params)
    console.log('this.token',this.token)
    return new Promise((resolve, reject) => {

      this.axios.post(url, params,{
        headers:{
         
          token:token||this.token
        }
      }).then(response => {
       
  
          resolve(response.data);
      
        }).catch((error) => {
          reject(error)
          Toast.fail('网络错误');
        })
    })
  }

  //返回一个Promise(发送get请求)
  fetchGet(url, param,token) {
    console.log('this.token',this.token)
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
          params: param,
          headers:{
           
            token:token||this.token
          }
        },
         
        )
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
          Toast.fail('网络错误');
        })
    })
  }
  isIos(){
    var u = window.navigator.userAgent, app = window.navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      return  false//'android'
    }
    if (isIOS) {
      return  true//'ios';
    }

  }
  GetUrlPara(str)
	{
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) 
		{
			return unescape(r[2]); 
		}else
		{
			return null;
		}
		
  }
  //rem装像素
  static rem2px(rem){
   let per = parseFloat($('html').css('fontSize'));
   return rem * per;
  }
  static checkPhone(mobile){
    let reg= /^1\d{10}$/g
    return reg.test(mobile)
  }
}
export let tool = new Tool();
