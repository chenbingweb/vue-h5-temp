<template>
  <div class="detail_page">
      <!-- <paging :open="active==1" @pagedata="onPageData" ref="page" :outdata="outData"></paging> -->
          <div >
            <div class="detail_img_box flex_center" >
              <van-image
                width="10rem"
                
                fit="contain"
                :src="detail.cover"
              />
              <div class="info_banner">
                <p style="margin-bottom:0.25rem" class="one_line">
                  {{detail.name}}
                </p>
                <div class="flex_between">
                    <div class="flex_start doc_info" >
                      <span class="one_line">{{detail.desc}}</span>
                    </div>
                    <div class="lesson_info_num">
                      <span class="icon_lesson">{{detail.section_list && detail.section_list.length}}节课</span>
                      <span>{{detail.read}}人学过</span>
                    </div>
                </div>
              </div>

            </div>
            <div class="tabs_box">
              <van-tabs :border="false" v-model="active">
                <van-tab >
                    <div slot="title" :class="{selected:active==0,tab_title:true}"  @click="onSelect(0)">课程简介</div>
                </van-tab>
                <van-tab >
                    <div slot="title" :class="{selected:active==1,tab_title:true}" @click="onSelect(1)">课程内容</div>
                </van-tab>
              </van-tabs>
            </div>
            <div class="lesson_detail_box" v-if="!noInfo">
              <!-- 内容详情 -->
              <div v-if="detail.content && active==0" class="rich_box" v-show="active==0" :style="{height:detail.is_buy==0?'7rem':'auto'}">
                  <div v-html="detail.content" style="overflow:hidden" :style="{height:detail.is_buy==0?'6.5rem':'auto'}"></div>
                  <div class="more" @click="onLookMore" v-if="detail.is_buy==0">查看更多</div>
              </div>
              <div v-if="!detail.content && active==0" class="no_data">暂无课程简介</div>
              <!-- 课程列表 -->
              <div  v-show="active==1" v-if="detail.section_list.length && active==1">
                <audio-item :cid="cid+''" @pop="onPop" :is-buy="detail.is_buy==1" :index="index+1" :item="item" v-for="(item,index) in detail.section_list" :key="index"/>
              </div>
              <div v-if="detail.section_list.length==0 && active==1" class="no_data">暂无课程列表</div>
            </div>
            <div v-else class="no_data">暂无数据</div>
          </div>
          
      <div class="bottom_buy" v-if="detail.is_buy==0">
        <pay-button ref="paybutton" :info="detail" :cid="cid+''"/>
      </div>     
      <!-- <router-link :to="{path:'/',query:{uuid:uuid}}" >  </router-link> -->
      <!-- v-if="uuid!==''" -->
        <div class="flex_center back_index" @click="onNavToIndex"  v-if="uuid!==''" >
          <div>首页</div>
        </div>
        
    
  </div>
</template>

<script>

import "./index.css"
import {  mapActions,mapState ,mapMutations} from "vuex"
import { Tab, Tabs } from "vant"
export default {
  components:{
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
  },
  data(){
    return {
      noInfo:true,
      uuid:'',
      cid:'',
      list:[],
      active: 0,
      showIndex:false,
      outData:{
                path:'/test-list'
              }

    }
  },
  computed:{
   ...mapState('detail/',{
      detail: state =>state.detail,
   }),
   
  },
  created(){
   
  },
  mounted(){
     this.active = this.$store.state.active;
     let { id ,uuid,order_sn} = this.$param(this.$router).query;
     this.cid =id;
     let toast = this.$loading()
     this.getDetail(id).then(()=>{
       toast.clear()
      
       this.noInfo = false;
     }).catch(()=>{
        toast.clear();
        
     })
    setTimeout(()=>{

      this.paybutton = this.$refs.paybutton;
      
      console.log(this.$refs)
    },20)
    //判断是否购买成功
    if(uuid)
    {
      setTimeout(()=>{
        this.uuid=uuid;
        let toast = this.$loading({message:'订单查询中...'})
        setTimeout(()=>{
          this.queryPayStatus({course_id:this.cid,order_sn}).then(res=>{
        
            if(res.pay_status==1)
            {
              this.$success({
                message:'支付成功',

              })
              this.$set(this.detail,'is_buy',1)
            
              //支付状态，1：已支付；0：未支付
            }
            else
            {
              this.$fail({
                message:'支付失败，请重新购买！'
              })
            }
          }).catch(err=>{
              this.$fail({
                message:'支付失败，请重新购买！'
              })
          })
        },2000)
      },1000)
    }
   

  },
  methods:{
    ...mapActions("detail/",['getDetail','queryPayStatus']),
    ...mapMutations(['setActive']),
    onNavToIndex(){
      this.$router.replace({path:'/',query:{uuid:this.uuid}})
    },
    onBackIndex(){
      this.$router.push("/")
    },
    onLookMore(){
      this.paybutton = this.$refs.paybutton;
       this.paybutton.show=true;
    },
    init(){

    },
    onPop({type}){
     
      this.paybutton.show=true;
    },
    onSelect(active){
       this.paybutton = this.$refs.paybutton;
      this.active = active;
     
    },
    onPageData(list) {
            console.log(list)
            this.list = this.list.concat(list)
      },
  },
  beforeRouteLeave (to, from, next) {
  
      let { meta:{index:indexto} } = to;
      let { meta:{index:indexfrom} } = from;
      if(indexto<indexfrom)
      {
        this.setActive(0)
      }
      next()
  }
}
</script>

<style>
</style>