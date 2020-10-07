<template>
  <div class="buy_box_bnt flex_center">
      <div class="buy_btn_12 flex_center" @click="onBuy">购买 ¥{{info.price}}</div>
        <!-- 注册 :overlay="false"-->
       <van-popup
       
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '36%' }"
        >
        <div v-if="!this.$store.state.isSign">
            <div class="flex_start item_pop">
                <span class="yzm_title">验证手机号</span>
            </div>
            <div class="item_user_box flex_between">
                <div class="flex_start">
                    <span style="width:1.06rem">+86</span>
                    <div class="input_box flex_start" v-focus>
                        <input type="number" v-model="mobile" placeholder="请输入您的手机号码">
                    </div>
                   
                </div>
                 <div class="get_check_code" v-code="config">获取验证码</div>
            </div>
            <div class="item_user_box flex_between">
                <div class="flex_start">
                    <span>验证码</span>
                    <div class="input_box flex_start" v-focus>
                        <input type="number" v-model="code" placeholder="请输入短信验证码">
                    </div>
                </div>
            </div>
            <div class="sure_send flex_center" @click="onSign">
                确 认
            </div>
        </div>
        <div v-if="this.$store.state.isSign">
            <div class="flex_start item_pop">
                <span class="yzm_title">购买课程</span>
            </div>
            <div class="item_user_box flex_between">
                 <span>课程金额</span>
                 <span style="color:#444444">¥{{info.price}}</span>
            </div>
            <div class="item_user_box flex_between">
                 <span>支付金额</span>
                 <span class="pay_price">¥<span style="font-size:0.5rem">{{info.price}}</span></span>
            </div>
            <div class="sure_send flex_center" @click="onToPay(cid)">确 认</div>
        </div>
       </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
import "./index.css"
import Tool,{tool} from "../../libs/Tool.js"
import { mapActions } from "vuex";
export default {
   
    components:{
        [Popup.name]:Popup
    },
    props:{
        info:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        cid:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            show:false,
            mobile:'',
            code:'',
            ty:'buy',
             config: {
                    callback: function () {}
                }
        }
    },
    mounted(){
        this.config.callback=this.callback;
    },
    methods:{
        ...mapActions(['getCode','userSign']),
        callback(time){
            if(this.mobile.trim()=='')
            {
                this.$alert('请输入手机号码')
                return
            }
            if(Tool.checkPhone(this.mobile.trim())==false)
            {
                this.$alert('手机号码不正确')
                return
            }
            let loading = this.$loading('发送中...');
            this.getCode({mobile:this.mobile.trim(),that:this}).then(()=>{
                loading.clear()
                this.$success({
                    message:'发送成功'
                })
            }).catch((res)=>{
                loading.clear()
                this.$fail({message:res.msg||'网络异常，请稍后再试'})
            })
            time()();
        },
        //用户注册
        onSign(){
            if(this.mobile.trim()=='')
            {
                this.$alert('请输入手机号码')
                return
            }
             if(Tool.checkPhone(this.mobile.trim())==false)
            {
                this.$alert('手机号码不正确')
                return
            }
             if(this.code.trim()=='')
            {
                this.$alert('请输入验证码')
                return
            }
            let sendData = {
                code:this.code,
                mobile:this.mobile
            };
            let loading = this.$loading('注册中...');
            this.userSign(sendData).then(()=>{
                loading.clear();
                this.$success('注册成功');
            }).catch((res)=>{
                loading.clear();
                this.$fail({message:res.msg||'网络异常，请稍后再试'})
            })
        },
        onBuy(){
            this.show=true;
            this.ty='buy';
        },
        onToPay(){
            
            this.$router.push({path:'/paypage'})
        },
        
    }
}
</script>

<style>

</style>