<template>
  <div class="audio_item" @click="onToPlayer(item)">
      <!-- 当前预定 -->
     <div class="audio_item_box " :class="{read_mark:item.is_learn}">
         <div class="title_3 one_line" :class="{redFont:item.is_learn}">
             {{index}}.{{item.name}}
             <span class="study_time" v-if="item.is_learn">上次学到</span>
         </div>
        <div class="flex_start lesson_item_info">
             <span class="time">{{item.num}}</span><span>{{item.read}}人学过</span>
         </div>
     </div>
  </div>
</template>

<script>
import "./index.css";
import { mapMutations } from "vuex";
export default {
    props:{
        item:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        index:{
            type:Number,
            default:1
        },
        isBuy:{
            type:Boolean,
            default:false
        },
        cid:{
            type:String,
            default:''
        }
    },
    computed:{
        //时间显示
    timeToMin(){
        let time = this.item.num;
        //分钟
      var minute = time / 60;
      var minutes = parseInt(minute);
      if (minutes < 10) {
          minutes = "0" + minutes;
      }
      //秒
      var second = time % 60;
      var seconds = Math.round(second);
      if (seconds < 10) {
          seconds = "0" + seconds;
      }
      return `${minutes}:${seconds}`
    },
    },
    methods:{
        ...mapMutations(['setActive']),
        onToPlayer(item){
            this.setActive(1);
            this.$router.push({path:'/player',query:{id:item.id,cid:this.cid}})
            return 
            if(this.$store.state.isSign)
            {
                if(item.is_try||this.isBuy)
                {
                    this.$router.push({path:'/player',query:{id:item.id}})
                }
                else
                {
                    this.$emit('pop',{type:'toBuy'})
                }
            }
            else
            {
                this.$emit('pop',{type:'toLoagin'})
            }
            
            


           
        }
    }
}
</script>

<style>

</style>