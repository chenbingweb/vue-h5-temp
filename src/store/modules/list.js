/*
    1 需要在 store/index.js 文件里引入
    2 最后在modules里配置
*/ 
// import { XXX } from "../../api/文件名"
export default {
    namespaced:true,
    state:{
        //例子
        //banner:[],
      
    },
    getters:{
        //例子
        //banner:state=>state.banner,
       
    },
    mutations:{
        //例子
        // setXXX(state, banner) {
        //     state.banner = banner
        // },
       
    },
    actions:{
        //例子
        //     ActionXXX({ commit,dispatch },info){
        //         return new Promise((resolve,reject)=>{
        //             XXX(info).then(res=>{
        //                 if(res.code==0)
        //                 {
        //                     commit('setXXX',res.data)
        //                     resolve()
        //                     //dispatch('getClassify')
        //                 }
        //             })
        //         }) 
        //    }
    }
}