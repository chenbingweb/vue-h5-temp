<template>
  <div>
      <vue-file-upload
            :url='url'
            ref="vueFileUploader"
            v-bind:filters = "filters"
            v-bind:events = 'cbEvents'
            v-bind:request-options = "reqopts"
            v-on:onAdd = "onAddItem"
      >     :auto-upload="true"
        <span slot="label">
            <slot></slot>
        </span>
    </vue-file-upload>
  </div>
</template>

<script>
import VueFileUpload from 'vue-file-upload';
import { baseUrl } from "../../config/index";
import { tool } from "../../libs/Tool"
export default {
    components:{
        VueFileUpload
    },
    data(){
        return{
                url:process.env.VUE_APP_URL +"/member/upload-avatar",
                files:[],
                //文件过滤器，只能上传图片
                filters:[
                    {
                        name:"imageFilter",
                        fn(file){
                            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                        }
                    }
                ],
                //回调函数绑定
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                        console.log(file);
                        console.log(response)
                        this.$emit('img',response)
                         this.loading.clear()
                        console.log("finish upload;")
                    }
                },
                //xhr请求附带参数
                reqopts:{
                    formData:{
                       // tokens:'tttttttttttttt'
                    },
                    headers:{
                        token:tool.token,
                        'Channel-Uuid':tool.uuid,
                    },
                    responseType:'json',
                    withCredentials:false
                    }
                }
    },
     mounted(){
        //设置formData数据
       this.$refs.vueFileUploader.setFormDataItem('authorization',"123");
       $('input').attr('accept',"image/*");
    },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
            console.log("正在上传")
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    onAddItem(files){
        console.log(files);
        this.files = files;
        this.uploadItem(files[0])

    },
    uploadItem(file){
      this.loading =  this.$loading('上传中...')
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$refs.vueFileUploader.uploadAll();
    },
    clearAll(){
      //清空所有文件
      this.$refs.vueFileUploader.clearAll();
    }
  },
}
</script>

<style scoped>
    input
    {
        opacity: 0;
    }
</style>