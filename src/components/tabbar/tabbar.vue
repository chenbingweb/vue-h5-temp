<template>
  <div v-show="show">
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in navList" :key="index" replace :to="item.to" :icon="item.icon">
        {{item.title}}
      </van-tabbar-item>
     
    </van-tabbar>
  </div>
</template>
<script>
import { tabbar } from "../../config"
export default {
    props:{
      show:{
        type:Boolean,
        default:true
      }
    },
    data:()=>{
        return {
            
            active:0,
            navList:tabbar
        }
    },
    watch:{
      $route:{
        　　handler(to,from){
              tabbar.forEach((item,index)=>{
                  if(item.name==to.name)
                  {
                      this.active=index;
                  }
              })
           },
           immediate: true
      }
    }
}
</script>

<style>

</style>