<template>
  <div class="my_info_page">
      <div class="photo_box flex_center">
          <!-- <div style="width:1.52rem;height:1.52rem;border-radius:50%;overflow:hidden" class="flex_center">
              <img style="width:130%" :src="avatar" alt="">
          </div>
           -->
        <van-image
            round
            width="1.52rem"
            height="1.52rem"
            fit="cover"
            :src="avatar"
        />
        <div class="re_upload relative">重新上传
            <div class="opacity">
                <upload-file @img="imgUrl"> </upload-file>
            </div>
        </div>
      </div>
      <div class="user_info_box">
          <div class="user_info_item flex_between">
              <div class="item_user">昵称</div>
              <div class="flex_start item_edit_box" v-focus>
                  <input class="item_edit" v-model="nickname"  placeholder="请输入昵称"/>
              </div>
          </div>
          <div class="user_info_item flex_between">
              <div class="item_user">姓名</div>
              <div class="flex_start item_edit_box" v-focus>
                  <input class="item_edit" v-model="realname"  placeholder="请输入姓名"/>
              </div>
          </div>
          <div class="user_info_item flex_between">
              <div class="item_user">手机</div>
              <div class="flex_start item_edit_box">
                  {{$store.state.mobile}}
                  <!-- <input disabled class="item_edit" :value="" placeholder="请输入昵称"/> -->
              </div>
          </div>
          <div  v-if="config.columns.length" class="user_info_item flex_between"  v-pickers="config">
              <div class="item_user">属性</div>
              <div class="flex_start item_edit_box">
                  <span class="item_edit"  v-if="job" >{{job}}</span>
                  <span class="item_edit"  v-else style="color:#ccc">请选择属性</span>
                  <!-- <input disabled :value="job" class="item_edit" placeholder="请输入昵称"/> -->
              </div>
          </div>
          <div v-if="config2.columns.length" class="user_info_item flex_between"  v-pickers="config2">
              <div class="item_user">感兴趣科室</div>
              <div class="flex_start item_edit_box">
                   <span class="item_edit" v-if="interest_department">{{interest_department}}</span>
                  <span class="item_edit" v-else  style="color:#ccc">请选择感兴趣科室</span>
                 
                  
                  <!-- <input  disabled :value="interest_department"  class="item_edit" placeholder="请输入昵称"/> -->
              </div>
          </div>
      </div>
      <div class="save_btn" @click="onSave">保存</div>
  </div>
</template>

<script>
import "./index.css"
import {mapMutations,mapActions} from "vuex"
//医生/护士/药师/技师
export default {
    data(){
        return {
            avatar:'',
            nickname:'',
            reakname:'',
            job:'',
            interest_department:'',
            config:{
                        columns:[],//对象数组，配置每一列显示的数据
                        valuekey:'name',//选项对象中，文字对应的 key
                        defaultindex:'',//单列选择器的默认选中项索引，多列选择器请参考下方的 Columns 配置
                        callback:(res)=>{//回调返回值
                            console.log(res)
                            this.job= res.name
                        },
                        newFn:com=>{
                            this._com = com
                        }
                    },
            config2:{
                 columns:[],//对象数组，配置每一列显示的数据
                    valuekey:'name',//选项对象中，文字对应的 key
                    defaultindex:'',//单列选择器的默认选中项索引，多列选择器请参考下方的 Columns 配置
                    callback:(res)=>{//回调返回值
                    
                        console.log(res)
                        this.interest_department= res.name
                    }
            }
        }
    },
    created(){
        //  depList:[],
        // jobList:[]
        this.nickname=this.$store.state.nickname;
        this.realname=this.$store.state.realname;
        this.avatar = this.$store.state.avatar;
        this.job=this.$store.state.job;
        this.interest_department=this.$store.state.interest_department;
       
    },
    mounted(){
        $('html').css(
            'background','#F8F9FA'
        )
        Promise.all([this.getDepartment(),this.getJob()]).then(()=>{
           
            this.config2.columns = this.$store.state.depList;
            let index2=this.$store.state.depList.findIndex(item=>item.name == this.$store.state.interest_department)
            this.config2.defaultindex = index2<0?0:index2;
            this.config.columns = this.$store.state.jobList;
            let index = this.$store.state.jobList.findIndex(item=>item.name == this.$store.state.job);
            this.config.defaultindex = index<0?0:index
           
        })
      
        
    },
    methods:{
        ...mapMutations(['setAvatar']),
        ...mapActions(['upDateInfo','getDepartment','getJob']),
        imgUrl(img){ 
            // this.setAvatar({
            //     avatar:img.data.url
            // })
            this.avatar=img.data.url;
        },
        onSave(){
            if(this.nickname.trim()=='')
            {
                this.$alert('请输入昵称')
                return
            }
            if(this.realname.trim()=='')
            {
                this.$alert('请输入姓名')
                return
            }
            this.$dialog.confirm({
                title:'提示',
                message:'确认提交？'
            }).then(()=>{
                let loading = this.$loading({
                     message:'保存中...' 
                })
                this.upDateInfo({
                    nickname:this.nickname,
                    realname:this.realname,
                    job:this.job,
                    avatar:this.avatar,
                    interest_department:this.interest_department
                }).then(()=>{
                    loading.clear()
                    this.$success('保存成功');
                    this.$store.state.nickname=this.nickname;
                    this.$store.state.realname=this.realname;
                    this.$store.state.job=this.job;
                    this.$store.state.avatar = this.avatar;
                    this.$store.state.interest_department = this.interest_department;
                    setTimeout(()=>{
                        this.$router.back();
                    },2000)
                })
            }).catch(()=>{

            })
            //  this.$alert('sdsd');
            // this.$tip();
            // let toast=this.$loading('上传中') <van-icon name="cross" />
          //  this.$err()
        }
    },
    destroyed(){
        if(this._com )
        {
            this._com.onCancel();
        }
    }
}
</script>

<style>
    
</style>