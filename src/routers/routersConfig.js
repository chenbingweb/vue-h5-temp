
import Home from '../pages/index/index.vue'
import MyCenter from "../pages/myCenter/myCenter.vue";
import lessonList from '../pages/lessonList/index.vue';
import myLesson from '../pages/myLesson/index.vue';
import aboutUs from "../pages/aboutUs/index.vue";
import searchPage from '../pages/searchPage/index.vue';
import payPage from '../pages/payPage/index.vue';
import player from  '../pages/player/index.vue';
import myInfo from '../pages/myInfo/index';
import Detail from "../pages/detail/detail.vue";
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
    {
      path: '/searchpage',
      name: 'searchpage',
      component: searchPage,
      meta:{
        title:'搜索'
      },
      children: [
       
      ],
      props: true
    },
    {
        path: '/mycenter',
        name: 'mycenter',
        component: MyCenter,
        meta:{
          title:'我的'
          //tabbar:true
        },
        children: [
         
        ]
    },
    {
      path: '/lessonlist',
      name: 'lessonlist',
      component: lessonList,
      meta:{
        title:'医阶'
        //tabbar:true
      },
      children: [
       
      ]
  },
    
    {
      path: '/mylesson',
      name: 'mylesson',
      component: myLesson,
      meta:{
        title:'已购课程'
      },
      children: [
       
      ],
      props: true
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: myInfo,
      meta:{
        title:'个人资料'
      },
      children: [
       
      ],
      props: true
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutUs,
      meta:{
        title:'关于我们'
      },
      children: [
       
      ],
      props: true
    },
    
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta:{
        title:'详情'
      },
      children: [
       
      ],
      props: true
    },
   
    //player
    {
      path:'/player',
      name:'player',
      component:player,
      meta:{
        title:'医阶'
      },
      children: [
       
      ],
    }, {
      path:'/paypage',
      name:'payPage',
      component:payPage,
      meta:{
        title:'支付'
      },
      children: [
       
      ],
    },
]