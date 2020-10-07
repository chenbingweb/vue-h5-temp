import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
import WXFN from "./wxFn.js";
import home from "./modules/home"
import detail from "./modules/detail"
import player from "./modules/player"
import App  from "./appFn"
import { getCode ,userSign,upDateInfo,getDepartment,getJob} from "../api/login.js"
import { tool } from '../libs/Tool.js';
import { pay } from '../api/detail.js';
Vue.use(Vuex); //使用 vuex

export default new Vuex.Store({
    state: {
        // 初始化状态
        'nickname': '',
        'realname': '',
        'mobile': '',
        'job': '',
        'avatar': '',
        'interest_department': '',
        isSign:false,
        token:'',//sessionStorage.getItem('token')||'',
        depList:[],
        jobList:[],
        active:0,
        category:''
    },
    modules:{
        home,
        detail,
        player
    },
    getters: {
        // ...
        getToken: (state) => {
           
         return state.token
        },
        
    },
    mutations: {
        setCategory(state,payload){
            state.category = payload;
        },
        setActive(state,payload){
            state.active = payload
        },
        // 处理状态 state, payload
        setToken(state, payload) {
            state.token=payload.token;
           
        },
        setInfo(state,payload){
 
            state.nickname=payload.nickname;
            state.realname=payload.realname;
            state.mobile=payload.mobile;
            if(payload.mobile)
            {
                state.isSign = true;
            }
           
            state.job=payload.job;
            state.avatar=payload.avatar;
            state.interest_department=payload.interest_department;
        },
        setAvatar(state,payload){
            state.avatar=payload.avatar;
        }
        
    },
    actions: {
        // 提交改变后的状态 {state, commit, rootState}
        //微信登录
        wxLogin({state, commit, rootState},payload){
            
            console.log(state, commit, rootState)
            WXFN.WXLogin(()=>{
                commit('setToken',{token:sessionStorage.getItem('token')})
                if(payload)
                {
                    payload.next && payload.next()
                }
            })
        },

        appLogin({state,commit,rootState,dispatch},payload){
            App.appLogin(res=>{
                tool.token = res.token;
                commit('setToken',{token:res.token});
                commit('setInfo',res)
                payload.next && payload.next()
            
            })
        },
        //获取手机验证码
        getCode({state},payload){
            return new Promise((resolve,reject)=>{
                getCode(payload.mobile).then(res=>{
                    if(res.code==0)
                    {
                        resolve()
                    }
                    else
                    {
                        reject(res)
                    }
                }).catch(reject)
            })
            
        },
        //绑定手机号码(注册)
        userSign({state},payload){
            return new Promise((resolve,reject)=>{
                userSign(payload).then(res=>{
                    if(res.code==0)
                    {
                        
                        state.mobile = payload.mobile;
                        state.isSign = true;
                        resolve();
                    }
                    else
                    {
                        reject(res)
                    }
                })
            })
        },
        //更新用户信息
        upDateInfo({state},payload){
            return new Promise((resolve,reject)=>{
                upDateInfo(payload).then(res=>{
                    if(res.code==0)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res)
                    }
                }).catch(reject)
            })
        },
        //获取科室列表
        getDepartment({state}){
            return new Promise((resolve,reject)=>{
                getDepartment().then(res=>{
                    if(res.code==0)
                    {
                        let list = [];
                        res.data.forEach((item,index)=>{
                            list.push({
                                name:item,
                                id:index
                            })
                        })
                        state.depList=list;
                      
                        resolve(list);
                    }
                    else
                    {
                        reject(res)
                    }
                }).catch(reject)
            })
        },
        getJob({state}){
            return new Promise((resolve,reject)=>{
                getJob().then(res=>{
                    if(res.code==0)
                    {
                        let list = [];
                        res.data.forEach((item,index)=>{
                            list.push({
                                name:item,
                                id:index
                            })
                        })
                        state.jobList=list;
                       
                        resolve(list);
                    }
                    else
                    {
                        reject(res)
                    }
                }).catch(reject)
            })
        }
        
    }
})