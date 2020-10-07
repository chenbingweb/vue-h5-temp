<template>
    <div>
        <van-list :offset="10" :immediate-check="immediate" v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
            <slot></slot>
        </van-list>

    </div>
</template>

<script>
    /*
        <paging @pagedata="onPageData" ref="page" :outdata="outData">
            <div class="list" v-for="(item,index) in list" :key="index">1212</div>
        </paging>
        data:()=>{
            return {
                list:[],
                outData: {
                        key: '',
                        status:'',
                        path: 'http://web05.jeemoo.net:8083/mock/5da017e1f56a3f7aa9aa0485/test/list'
                },
            }
        }
       methods:{
                onPageData: function (list) {
                    console.log(list)
                    this.list = this.list.concat(list)
                },
       }

       
    */ 
    import { List  } from 'vant';

    export default {
        components:{
                [List.name]:List,
            },
        props:{
                outdata:{
                    type: Object,
                    default: function () {
                        return { }
                    }
                },
                open:{
                    type:Boolean,
                    default:true
                }
            },
        watch:{
            outdata:{
                handler:function(newVal){
                  
                    if(newVal.path)
                    {
                        this.reload()
                    }
                },
                deep:true,
               
            },
            open:{
                handler(newVal){
                   
                    this._open=newVal;
                    this.finished=!newVal;
                    this.loading=newVal;
                    this.finishedtext=''
                    if(newVal)
                    {
                        this.reload()
                    }
                    else
                    {
                       
                    }
                    
                },
               
            }
        },

        data:function(){
            return {
                _open:true,
                list: [],
                loading: false,
                finished: false,
                immediate:false,
                finishedtext:'没有更多了'
            }
        },
        created: function () {
            this.page_num=1;
            this.page_size=10;
       
           

        },
        mounted: function () {
            console.log(this.$parent)
            this.sendData={
                        page_size:this.page_size,
                    page_num:this.page_num,
                    hidden:true
            }
            // this.watcher = {}
            var that=this;
            for(var key in this.outdata)
            {
                this.sendData[key]=this.outdata[key];
            }

        
        },
        methods:{
            reload:function(){
                if(this._open==false) return
                //需求load方法触发
                    this.loading = true;
                    this.finished = false;
                    this.outdata.page_num=1;
                    this.immediate=false
                for(var key in this.outdata)
                {
                    this.sendData[key]=this.outdata[key];
                }
                this.$parent.list=[]
                this.getList()
            },
            onLoad:function(){
                  if(this._open==false) return
                this.getList()
                //    setTimeout(() => {
                //         for (let i = 0; i < 10; i++) {
                //         this.list.push(this.list.length + 1);
                //         }
                //         // 加载状态结束
                //         this.loading = false;

                //         // 数据全部加载完成
                //         if (this.list.length >= 40) {
                //           this.finished = true;
                //         }
                //     }, 2000);
            },
            getList: async function () {
                var that = this;
                //$.showLoading()
                let res = await this.$tool.fetchPost(that.outdata.path,this.sendData,this.$store.state.token);
                console.log(res)
               
                if (res.data.length) {
                        //第一次加载判断如果小于10调数据，结束分页查询
                        if(that.sendData.page_num==1 && res.data.length<that.page_size)
                        {
                            that.finished = true;
                        }
                        else
                        {
                            if(res.data.length<that.page_size)
                            {
                                that.finished = true;
                                that.finishedtext='没有更多了'
                            }
                            else
                            {
                                that.loading = false;
                            }
                            

                        }
                        
                        that.sendData.page_num +=1;
                        //console.log(that.sendObj)
                        that.$emit('pagedata',res.data)

                    } else {
                        if(that.sendData.page_num==1){
                            // that.loading = false;
                            that.finishedtext='暂无数据'
                            that.finished = true;
                        }
                        else
                        {
                            that.finished = true;
                            that.finishedtext='没有更多了'
                        }
                        
                    }
                    
               
            },
        }
    }
</script>

<style>

</style>