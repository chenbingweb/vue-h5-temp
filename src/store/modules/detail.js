import { getDetail ,queryPayStatus,pay} from "../../api/detail";
import { Toast } from 'vant';
export default {
    namespaced:true,
    state:{
       detail:{}
    },
    getters:{
        detail:state=>state.detail
    },
    actions:{
        //获取课程详情
        getDetail({ commit },id){
        
         return new Promise((resolve,reject)=>{
            getDetail(id).then(res=>{
                if(res.code==0)
                {
                    // res.data.is_buy = 1
                    commit('setDetail',res.data)
                    resolve()
                }
                else
                {
                    reject()
                }
            }).catch(reject)
         }) 
       }, 
       //查询课程是否购买成功
       queryPayStatus({state},payload){
            return new Promise((resolve,reject)=>{
                queryPayStatus(payload).then(res=>{
                    if(res.code==0)
                    {
                        resolve(res.data)
                    }
                    else
                    {
                        reject(res)
                    }
                }).catch(reject)
            })
       },
       //购买课程
       pay({state},id){
            return new Promise((resolve,reject)=>{
                pay(id).then(res=>{
                    if(res.code==0)
                    {
                        resolve(res.data)
                    }
                    else
                    {
                        reject()
                    }
                }).catch(reject)
            })
       }
    },
    mutations:{
        setDetail(state, detail) {
            state.detail = detail
        }
       
    },
}