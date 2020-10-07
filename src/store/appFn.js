import { tool } from "../libs/Tool"
import _interface from "../interface/interface"
import { getClientId,login,getUserInfo } from "../api/login.js"
import Vue from "vue"
const cnative=window.cnative;
class App{
    constructor(){
        this.cid = '';
        // let uuid ='';
     
        // if(!localStorage.getItem('uuid'))
        // {
        //     uuid = tool.GetUrlPara('uuid');
        //     localStorage.setItem('uuid',uuid)
        // }
        // else
        // {
        //     uuid =localStorage.getItem('uuid');
        // }
        
        this.express_time='';
        this.code='';
        this.openid = '';
        // if(!uuid)
        // {
        //     console.error('url没有传uuid')
        // }
        // else
        // {
           
        //     this.init()
        // }
    }
    init(){
        //this.getClientId()
    }
    //获取clientId
    async getClientId(){
        try{
            let result = await getClientId();
           
            if(result.code==0)
            {
                this.cid = result.data.client_id;
                this.cname = result.data.client_name;
                console.log('client_id',this.cid)
                console.log('client_name',this.cname)

                this.getOpenId();
                //this.getCode();
            }
        }
        catch(err){

        }
      

    }
    //获取openId	applyAuthorize	clientId:应用id	openId
    getOpenId(cb){
        let getOpenId = cnative.callFactory('applyAuthorize','_getopenid','Yxcz');
        getOpenId({
            clientId:this.cid
        },(openid)=>{
            this.openid = openid;
          
            cb && cb(openid)
            console.log('openid',openid) 
        })  
            
      
        
    }
   
    //获取授权code
    getCode(cb){
        console.log('getCode')
        let getCode = cnative.callFactory('applyClientCode','_getcode','Yxcz');
        getCode({
            clientId:this.cid,
            clientName:this.cname
        },(code)=>{
            this.code = code;
            cb && cb(code)
            console.log('code',code) 
            
        })
    }
    //获取token
    async login(){
    try{
        let result = await login({code:this.code});
        if(result.code==0)
        {
            tool.token = result.data.token
           return Promise.resolve(result.data)
        }
    }
    catch(err){

    }
  
    }
    async reFresh(store){
        setTimeout(()=>{
            this.login().then(res=>{
                tool.token = result.data.token
                store.commit('setToken',res.token)
            })
            this.reFresh(store)
        },60*60*1000)
    }
    async appLogin(callBack){
        try{
            let result = await getClientId();
            if(result.code==0)
            {
                this.cid = result.data.client_id;
                this.cname = result.data.client_name;
                console.log('client_id',this.cid)
                console.log('client_name',this.cname)
                this.getOpenId(openid=>{
                    console.log('openid=>',openid)
                    if( process.env.NODE_ENV=='development')
                    {
                        openid = '0c8b81b93723fe800c2b4ebbb7b5d487'
                    }
                    getUserInfo(openid).then(res=>{
                        console.log(res)
                        console.log('openid:',openid)
                        //已授权
                        if(res.code==0)
                        {
                            tool.token = res.data.token;
                            tool.setToken( res.data.token)
                            console.log('tool.token ',tool.token )
                            callBack(res.data)
                        }
                        else
                        {
                            console.log('授权')
                            let getCode = cnative.callFactory('applyClientCode','_getcode','Yxcz');
                            getCode({
                                clientId:this.cid,
                                clientName:this.cname
                            },(code)=>{
                                
                                if(code=='')
                                {
                                    console.log('code:',code)
                                    window.history.back()
                                }
                                else
                                {
                                    this.code = code;
                                    console.log('code:',code)
                                    this.login().then(callBack)
                                }
                                
                                
                            })
                           
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                });
                
            }
        }
        catch(err){

        }
    }

    
}
export default new App()