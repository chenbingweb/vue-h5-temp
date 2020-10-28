
import Home from '../pages/index/index.vue'	
/*imortant*/
/**/
// const Home = () => import(/* webpackChunkName: "home" */ '../pages/index/index.vue');
// const MyCenter = ()=>import(/* webpackChunkName:"myCenter"*/ '../pages/myCenter/myCenter.vue');
// const lessonList = ()=>import(/* webpackChunkName:"lessonList"*/ '../pages/lessonList/index.vue');
// const myLesson = ()=>import(/* webpackChunkName:"myLesson"*/ '../pages/myLesson/index.vue');
// const aboutUs = ()=>import(/*webpackChunkName:"aboutUs"*/ '../pages/aboutUs/index.vue');
// const searchPage = ()=>import(/*webpackChunkName:"searchPage"*/ '../pages/searchPage/index.vue');
// const payPage = ()=>import(/*webpackChunkName:"payPage"*/ '../pages/payPage/index.vue');
// const player = ()=>import(/*webpackChunkName:"player"*/ '../pages/player/index.vue');
// const myInfo = ()=>import(/* webpackChunkName:"myInfo"*/ '../pages/myInfo/index')
// const Detail =()=>import(/* webpackChunkName:"myCenter"*/ '../pages/detail/detail.vue')
// const Test =()=>import(/* webpackChunkName:"myCenter"*/ '../pages/test/index.vue')


export default [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        tabbar:false,
        title:'医阶'
      },
      children: [
        
      ],
    },
    /*router*/
    {
      path: "*",
      redirect: "/"
    }

]