<template>
  <div>
     
        <!-- <paging @pagedata="onPageData" ref="page" :outdata="outData" >
            <div class="list_box">
                <div style="line-height:1.4rem;border-bottom:1px solid #eee"  v-for="(item,index) in list" :key="index">
                    {{item}}
                </div>
            </div>
        </paging> -->
        <div>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div style="line-height:1.4rem;border-bottom:1px solid #eee"  v-for="(item,index) in list" :key="index">
                                {{item}}
                            </div>
            </van-list>
        </div>
  </div>
</template>

<script>
import { List } from 'vant';
export default {
    components:{
        [List.name]:List
    },
    data(){
        return {
            list:[],
             loading: false,
            finished: false,
            outData: {
                  path: '/wx/api/info-record'
          },
        }
    },
    methods:{
           onLoad() {
            //    this.loading=true
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
         onPageData: function (list) {
            console.log(list)
            this.list = this.list.concat(list)
        },
    }
}
</script>

<style>

</style>