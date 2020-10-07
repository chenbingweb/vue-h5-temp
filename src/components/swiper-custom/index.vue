<template>
  <div class="swiper_box">
      <van-swipe :show-indicators="true" :class="set.className" :autoplay="3000"  indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgs" :key="index">
             <img class="img" :src="item.img_url" @click="onNav(item)"/>
        </van-swipe-item>
      </van-swipe>

  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';


export default {
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem
    },
    props:{
        imgs:{
            type:Array,
            value:[]
        },
        set:{
            type:Object,
            value:{}
        },
        height:{
            type:Number,
            value:0
        }
    },
    data(){
        return {
             images: []
        }
    },
    mounted(){
        setTimeout(()=>{
            $('.van-swipe__indicators')[0].style="bottom: 0.646667rem"
        },10)
        
    },
    methods:{
        onNav({type,id,course_id,url,category_id}){
            //1=课程,2=链接,3=分类
            if(type==1)
            {
                //this.$store.push({path:'/detail',query:{id:id}})
                this.$router.push('/detail?id='+id)
            }
            else if(type==2)
            {
                window.location.href =url;
            }
            else if(type==3)
            {
                //{path:'/lessonlist',query: { id: course_id}}
               this.$router.push('/lessonlist?id='+category_id)
            }
        }
    }
}
</script>

<style scoped>
   .img
    {
        width: 10rem;
    }
   .swiper_box .van-swipe__indicators
    {
        bottom: .346667rem!important;
            position: absolute!important;
        
        left: 50%!important;
        display: -webkit-box!important;
        display: -webkit-flex!important;
        display: flex!important;
        -webkit-transform: translateX(-50%)!important;
        transform: translateX(-50%)!important;
    }
</style>>

