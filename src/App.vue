<template>
  <div id="app">
    <transition :name="transitionName">  
      <router-view></router-view>
    </transition>
    <Tabbar :show="showBar"/>
  </div>
</template>

<script>
import Tabbar from "./components/tabbar/tabbar"
export default {
  name: 'app',
  components:{
    Tabbar
  },
  watch:{
    $route(to,from){
      
      this.showBar=to.meta.tabbar||false;
      if(this.showBar)
      {
        $('body').addClass('bm')
      }
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      

    }
  },

  data:()=>{
    return {
      showBar:false,
      active:false,
      transitionName:''
    }
  },

  created(){
    console.log(this.$tool)
   
  },
  mounted(){
   
  }
}
</script>

<style>
@import "./app.css";
  .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  width: 100%;
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  width: 100%;
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  width: 100%;
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  width: 100%;
}

.bm
{
  padding-bottom: 1.333333rem;
}

#app {
  /* display: flex;
  justify-content: flex-start; */
}
.box
{
  width: 750px;
  height: 100px;
  display: flex;
  justify-content: flex-start; 
  background: red;
}
</style>
