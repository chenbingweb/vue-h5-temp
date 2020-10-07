<template>
  <div class="myLesson_page">
      <div class="my_header flex_start">
        <title-item :title="title"/>
      </div>
      <paging-child @pagedata="onPageData" ref="page" :outdata="outData">
        <div class="list" v-for="(item,index) in list" :key="index" @click="onToDetail(item)">
            <lesson-item :item="item" :ty="ty"/>
        </div>
      </paging-child>
  </div>
</template>

<script>
import "./index.css";
import _interface from "../../interface/interface.js"
export default {
    data(){
        return {
             outData: {
                 path:'',
                 ty:''
             },
             list:[],
             title:'',
             ty:''
        }
    },
    created(){
        this.ty=this.$route.query.ty;
        this.title=this.$route.query.ty=='zj'?'我的足迹':'已购课程'
    },
   mounted(){
         this.init();
         //我的足记
         if(this.$route.query.ty=='zj')
         {
            this.outData.path=_interface.zjList
         }
         else//我的课程
         {
            this.outData.path=_interface.hasBuyLesson
         }
      
    },
    methods:{
        init(){
            $('html').css(
                'background','#fff'
            );
            if(this.ty=='zj')
            {
                document.title='我的足迹';
            }
        },
        onPageData(res){
            this.list=[...this.list,...res]
        },
        onToDetail(){

        }
    }
}
</script>

<style>

</style>