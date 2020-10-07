<template>
  <div v-html="richText" class="about_us_page"></div>
</template>

<script>
import "./index.css";
import _interface from '../../interface/interface';

export default {
    data(){
        return {
            richText:'<p class="no_data">暂无数据</p>'
        }
    },
    mounted(){
        let loading = this.$loading();
        this.$tool.fetchPost(_interface.aboutUs).then(res=>{
            loading.clear()
            if(res.code==0)
            {
                this.richText = res.data;
            }
                
        })
    }
}
</script>

<style>

</style>