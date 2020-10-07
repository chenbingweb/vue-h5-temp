import { getBanner,getClassify ,getRecommendCourse,alertAd} from "../../api/home"
export default {
    namespaced:true,
    state:{
        banner:[],
        classify:[],
        recommend:[],
        ad:{},
        open:false,
        hasOpen:false
    },
    getters:{
        banner:state=>state.banner,
        classify:state=>state.classify,
        indexClassify:state=>state.classify.slice(0,8),
        recommend:state=>state.recommend
    },
    actions:{
        //获取banner列表
       getBanner({ commit,dispatch },info){
            return new Promise((resolve,reject)=>{getBanner(info).then(res=>{
                    if(res.code==0)
                    {
                        commit('setBanner',res.data)
                        resolve()
                        //dispatch('getClassify')
                    }
                })
            }) 
       }, 
       //获取分类
       getClassify({commit,dispatch}){
            return  new Promise((resolve,reject)=>{  getClassify().then(res=>{
                            if(res.code==0)
                            {
                              
                                commit('setClassify',res.data||[])
                                //dispatch('getRecommendCourse')
                               
                                resolve()
                            }
                        })
                 })
       },
       //获取分类下的列表
       getRecommendCourse({commit}){
           return new Promise((resolve,reject)=>{ getRecommendCourse().then(res=>{
                        if(res.code==0)
                        {
                            commit('setRecommend',res.data)
                            resolve()
                        }
                        
                    })
                })
       },
       //广告弹窗
       alertAd({state,commit},payload){
        return new Promise((resolve,reject)=>{
            alertAd().then(res=>{
                if(res.code==0)
                {
                    payload.callback && payload.callback(res.data)
                    if(state.open==false)
                    {
                          //1=课程,2=链接,3=分类
                          if(res.data && res.data.img_url && state.hasOpen==false)
                          {
                            commit('setAd',res.data)
                          }
                        
                    }
                   
                   
                    resolve()
                }
            })
        }) 
       }
    },
    mutations:{
        setBanner(state, banner) {
            state.banner = banner
          },
        setClassify(state, classify) {
            state.classify = classify
          },
        setRecommend(state, recommend){
            state.recommend = recommend
        },
        setAd(state,ad){
            setTimeout(()=>{
                state.open=true;
            },1000)
            
            state.hasOpen = true;
            state.ad = ad;
        }
    },
}