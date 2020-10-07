import { getSectionInfo } from "../../api/player";
export default {
    namespaced:true,
    state:{
       detail:{}
    },
    getters:{
        detail:state=>state.detail
    },
    actions:{
        //获取课程小节
        getSectionInfo({ commit },payload){
         return new Promise((resolve,reject)=>{
            getSectionInfo(payload.id).then(res=>{
                if(res.code==0)
                {
                    commit('setDetail',res.data)
                    resolve()
                }
            })
         }) 
       }, 
  
    },
    mutations:{
        setDetail(state, detail) {
            state.detail = detail
        }
       
    },
}