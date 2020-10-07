<template>
  <div class="center_page">
    <div class="header flex_start">
        <div class="flex_center photo">
            <!-- <img :avar="avatar" style="width:130%"/> -->
            <van-image
                    round
                    width="1.333333rem"
                    height="1.333333rem"
                    fit="cover"
                    :src="avatar"
                />
        </div>
        <p class="user_name one_line">{{nickname}}</p>
    </div>
    <div class="nav_box">
        <div class="nav_item flex_between" @click="onNavInfo">
            <div class="nav_1" >个人资料</div>
        </div>
         <div class="nav_item flex_between"  @click="onNav('zj')">
            <div class="nav_2" >我的足迹</div>
        </div>
         <div class="nav_item flex_between" @click="onNav('lession')">
            <div class="nav_3">已购课程</div>
        </div>
         <div class="nav_item flex_between" @click="onNavAbout">
            <div class="nav_4">关于我们</div>
        </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

import "./index.css"
import { mapActions,mapState } from "vuex"
import img from "../../images/no_photo.png"
export default {
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,

    },
    data:()=>{
        return {
            avar:img
        }
    },
    created:()=>{
     
    },
    computed:{
        ...mapState({
          nickname:state=>state.nickname ,
          avatar:state=>state.avatar
        })
    },
    ready(){
        
       
      
    },
    mounted(){
        $('html').css(
            'background','#F8F9FA'
        )
    },
    methods:{
        // ...mapActions('myInfo/',['getMyInfo']),
        onNav(ty){
            this.$router.push({path:'/mylesson', query: { ty }})
        },
        onNavInfo(){
            this.$router.push({path:'/myinfo',})
        },
        onNavAbout(){
            this.$router.push({path:'/aboutus'})
        }
    
    }
}
</script>

<style>
    .list
    {
        line-height: 100px;
    }
    .item
    {
        position: absolute;
        height: 100%;;
        width: 10rem;
  
        background-color: red;
    }
    .back_index
    {
        width: 1.066667rem;
        height: 1.066667rem;
        border-radius: 50%;
        background-color: blueviolet;
        position: fixed;
        right: .4rem;
        bottom: 1.466667rem;
        color:#fff;
        font-size: .266667rem;
        text-align: center;
        line-height: 1.066667rem;
    }
</style>