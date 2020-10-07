<template>
  <div class="lesson_list_page">
      <div class="tab_box">
        <van-tabs v-model="active" animated >
            <van-tab v-for="(item,index) in tabList"  :key="index" :title="index+''">
                <div slot="title" class="title_select_name one_line" :class="{selected:item.selected}" @click="onSelect({index,id:item.id})">{{item.name}}</div>
            </van-tab>
        </van-tabs>
      </div>
       <paging-child :open="open" @pagedata="onPageData" ref="page" :outdata="outData">
        <div class="list" v-for="(item,index) in list" :key="index" @click="onToDetail(item)">
            <lesson-item :item="item" :ty="item.is_buy==1?'is_buy':'info'" />
        </div>
      </paging-child>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { mapGetters,mapMutations } from "vuex";
import _interface from "../../interface/interface.js"
import "./index.css"
export default {
    components:{
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
    },
    data(){
        return {
            tabList:[
                {
                    name:'全部',
                    id:'all',
                    
                }
            ],
            active:0,
            open:true,
            outData:{
                path:_interface.testList,
                id:'',
                keyword:''
            },

             list:[]
        }
    },
    computed:{
        ...mapGetters('home/',['classify'])
    },
    created(){
     
        this.tabList=[...this.classify,...this.tabList];
        if(this.$store.state.category!=='')
        {
           
            let index =  this.tabList.findIndex(item=>item.id==this.$store.state.category)
            this.active = index<0?0:index;
        }
        else
        {
            let index =  this.tabList.findIndex(item=>item.id==this.$route.query.id)
            this.active = index<0?this.tabList.length-1:index;
        }
        
        console.log(this.active)
        console.log(this.$route)
    },
    mounted(){
        $('html').css(
            'background','#fff'
        )
          
        this.outData.id = this.$store.state.category//this.$route.query.id;
        this.outData.keyword = this.$route.query.keyword||''
        console.log(this.$route.query.id)
          this.tabList.forEach((item,index)=>{
                if(this.active==index)
                {
                    item.selected=true
                }
                else
                {
                    item.selected=false
                }
            })
    },
    methods:{
        ...mapMutations(['setCategory']),
        onSelect({index,id}){
            this.active = index;
            this.tabList.forEach(item=>{
                if(item.id==id)
                {
                    item.selected=true;
                    
                }
                else
                {
                    item.selected=false
                }
            })
            this.outData.id =id;
             this.setCategory(id);
        },
        onPageData(res){
            this.list=[...this.list,...res]
        },
        onToDetail(item){
             
            
           
        }
    },
    beforeRouteLeave (to, from, next) {

        let { meta:{index:indexto} } = to;
        let { meta:{index:indexfrom} } = from;
        if(indexto<indexfrom)
        {
         this.setCategory('');
        }
        next()
    }
}
</script>

<style>

</style>