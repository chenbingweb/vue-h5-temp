<template>
  <div class="home" >
    <div class="header">
       <div class="_s_k_" v-if="banner.length==0" style="width:100%;height:5.413333rem"></div>
      <keep-alive v-if="banner.length">
        <swiper  :imgs="banner" :set="{className:'swiper'}"/>
      </keep-alive>
      <!-- 搜索 -->
      <div class="search_box flex_start">
        <router-link :to="{path:'/searchpage'}"  class="flex_start search_content">
            搜索您需要的内容
        </router-link>
        <div class="to_center" @click="onToCenter"></div>
      </div >
    </div>
    <!-- 分类 -->
    <div class="classic_box">
      <div class="classic_child flex_start" v-if="indexClassify.length">
        <div @click="onNavTo(item)" :to="{path:'/lessonlist',query: { id: item.id }}" class="classic_item flex_center" v-for="(item,index) in indexClassify" :key="index">
          <!-- <img :src="item.img_url" alt=""> -->
          <div style="width:100%;height:0.8rem" class="flex_center">
              <img style="width:0.7rem" width="0.7rem" :src="item.img_url" />
          </div>
          <p style="margin-top:0.2rem;width:100%;text-align:center" class="one_line">{{item.name}}</p>
        </div>
      </div>
      <div class="classic_child flex_start" v-else>
        <div class="classic_item flex_center" v-for="(item,index) in 8" :key="index">
          <!-- <img :src="item.img_url" alt=""> -->
          <div style="padding-bottom:0.2rem">
              <van-image  :src="item.img_url" />
          </div>
          <p class="_s_k_" style="width:0.8rem;height:0.2rem"></p>
        </div>
      </div>
    </div>
    <!-- 推荐课程 -->
    <div class="recomment_lesson">
      <div class="title flex_start">
        <title-item title="推荐课程"/>
      </div>
      <!-- 列表 -->
      <div class="lesson_list">
        <div v-if="recommend.length">
          <lesson-item v-for="(item,index) in recommend" :item="item" :ty="item.is_buy==1?'is_buy':'info'" :key="index"/>
        </div>
        <div v-else class="no_data">暂无数据</div>
      </div>
    </div>
    <dialog-costom/>
    <!-- <div class="list_box">
       <keep-alive>
        <paging @pagedata="onPageData" ref="page" :outdata="outData">
        
            <div class="list" v-for="(item,index) in list" :key="index" @click="onToDetail(item)">
              <div class="list_item flex_between">
                <div class="icon_box">
                  <img :src="item.img_url" alt="">
                </div>
                <div class="desc_box">
                  <p class="title one_line">{{item.title}}</p>
                  <p class="desc two_line" >{{item.desc}}</p>
                  <p class="desc two_line" >{{item.time}}</p>
                </div>
              </div>


            </div>
          
        </paging>
      </keep-alive>
    </div> -->

  </div>
</template>

<script>
// import { Button } from "vant"
import swiper  from "@/components/swiper-custom/index.vue"
import { Tab, Tabs } from 'vant';
import { mapActions,mapGetters ,mapMutations} from "vuex";
import Tool from "../../libs/Tool"
import dialogCostom from "../../components/dialog/index.vue"
import img from "../../images/img/t_1.jpg"

export default {
  components:{
    dialogCostom,
    swiper,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs
  },
  data(){
    return {

     
      active:this.$store.state.home.classify.length?this.$store.state.home.classify[0]._id:'',
      area:'',
      detail:'sdsd',
      date:{
        datetime:'date',
         callback:(res)=>{
                      console.log(res)
                }
      },
      config:{
                  columns:[1,2,2,2,3],
                  valuekey:'name',
                  defaultindex:0,
                  callback:(res)=>{
                      console.log(res)
                }
          },
      res:{
        value:'',
        callback:(res)=>{
          console.log(res)
          console.log(this)
        }
      },
      showArea:false,
      list:[],
      outData: {
             
             
      },
     // count:this.$store.count
    }
  },
  created(){
    let loading = this.$loading();
    Promise.all([this.getBanner(),this.getClassify(),this.getRecommendCourse(),this.alertAd({})]).then(res=>{
      loading.clear()
    })
    //this.getBanner();
  },
  computed:{
    ...mapGetters('home/',['banner','classify','recommend','indexClassify'])
  },
  mounted(){
    
    console.log(this.$store)

  },
  methods:{
    ...mapActions('home/',[
      'getBanner',
      'getClassify',
      'getRecommendCourse',
      'alertAd',
    ]),
    ...mapMutations(['setCategory']),
    onNavTo(item){
      this.setCategory(item.id);
      this.$router.push({path:'/lessonlist',query: { id: item.id }})
    },
    onPageData(res){
      this.list=[...this.list,...res]
    },
    onTab(name,title){
      this.outData.ty=name;
      console.log(name,title)
    },
    onToDetail(item){
      // this.$router.push({name:'detail',params:{id:item.id}})
       this.$router.push({path:'/detail?id='+item.id})
       //this.$router.push({path:'/tests?id='+item.id})
    },

    onShows(){
      this.showArea=true;
    },
    onConfirmArea(){
      this.showArea=true
    },
    onCancelArea(){

    },
    onToCenter(){
      this.$router.push({path:'/mycenter'})
    },
    onLogin(){
      this.$router.push({ path: '/detail?id=3' })
      // window.location.href="/login"
      // console.log(this)
      // this.$tool.fetchGet(this.$interface.login).then(res=>{
      //   console.log(res)
      // }).catch(console.log)
    }
  }
}
</script>

<style>
  @import "index.css";
  .swiper
  {
    width: 10rem;
    height: 5rem;
  }
</style>