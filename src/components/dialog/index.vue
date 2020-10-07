<template>
  <div class="diag_tip">
      <!-- height="8.52rem" -->
     <van-popup v-model="$store.state.home.open">
         <div class="mask" >
             <div @click="onNav(ad)">
                <van-image
                    width="6.666667rem"
                    
                    fit="cover"
                    :src="ad.img_url"
                />
             </div>
            
             <div class="closed" @click="onClose"></div>
            </div>
     </van-popup>
  </div>
</template>

<script>
import "./index.css";
import { Popup } from 'vant';
import { mapState } from "vuex";
export default {
    components:{
        [Popup.name]:Popup
    },
    props:{
        tip:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    computed:{
        ...mapState('home/',{
            ad:state=>state.ad
        })
    },
    data(){
        return {
            show:false
        }
    },
    mounted(){
        console.log(this.$store.state.home.open)
        this.show=this.$store.state.home.open;
    },
    methods:{
        onClose(){
            this.$store.state.home.open=false
        },
        onNav({type,url,id,course_id}){
            this.$store.state.home.open=false;
              //1=课程,2=链接,3=分类
            if(type==1)
            {
                //this.$store.push({path:'/detail',query:{id:id}})
                this.$router.push('/detail?id='+id)
            }
            else if(type==2)
            {
                window.location.href = url;
            }
            else if(type==3)
            {
                //{path:'/lessonlist',query: { id: course_id}}
               this.$router.push('/lessonlist?id='+course_id)
            }
          
        }
    }
}
</script>

<style>
    .date
    {
        width: 6.666667rem;
    }
</style>