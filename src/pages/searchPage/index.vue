<template>
  <div class="search_page_box">
      <div class="search_content ">
        <div class="flex_start seach_item_content">
            <div class="search_input_box flex_start" v-focus >
                <input class="_search_" type="text" v-autofocus ref="search" @blur="onSearch" placeholder="搜索您需要的内容">
            </div>
            <div class="cancel_btn" @click="onBack">取消</div>
        </div>
        <div class="flex_between clear_control" v-if="hisList.length">
            <span>搜索记录</span>
            <div class="flex_start clear_btn" @click="onRemove">
                <span>全部清除</span>
            </div>
        </div>
      </div>
      <!-- 记录列表 -->
      <div class="his_list ss" :style="{'padding-top':hisList.length?'2.47rem':'1.47rem'}">
          <div class="his_item flex_between" v-for="(item,index) in hisList" :key="index" @click="clickSearch(item)">
              <span>{{item}}</span>
              <span class="del_btn" @click="onDel(index)"></span>
          </div>
      </div>
     
  </div>
</template>

<script>
import "./index.css"
export default {
    data(){
        return {
            hisList:[]
        }
    },
    mounted(){
        this.init()
        console.log($('._search_')[0].focus())
        setTimeout(()=>{
            this.$refs.search.focus()
            
        },20)
        
    },
    methods:{
         init(){
            $('html').css(
                'background','#F3F3F3'
            );
            this.getStore();
        },
        getStore(){
            let hisList = window.localStorage.getItem('his');
            if(hisList)
            {
                 this.hisList =JSON.parse(hisList) ;
            }
           
        },
        onBack(){
            this.$router.back()
        },
        onRemove(){
            window.localStorage.removeItem('his');
             this.hisList=[];
        },
        clickSearch(value){
             this.$router.push({path:'/lessonlist',query: { keyword:value }})
        },
        onSearch({target:{value}}){
           
            if(!value || value.trim() =='') return
             this.$router.push({path:'/lessonlist',query: { keyword:value }})
            // console.log(value)
            let hisList = window.localStorage.getItem('his');
            if(hisList)
            {
                hisList = JSON.parse(hisList);

                hisList.push(value);
                hisList =Array.from(new Set(hisList));
                window.localStorage.setItem('his',JSON.stringify(hisList.reverse()))
                this.hisList = hisList;
            }
            else
            {
                this.hisList =[value];
                window.localStorage.setItem('his',JSON.stringify([value]))
            }
            
           
        },
        onDel(index){
            this.hisList.splice(index,1);
             window.localStorage.setItem('his',JSON.stringify(this.hisList))
        }
    }
}
</script>

<style>

</style>