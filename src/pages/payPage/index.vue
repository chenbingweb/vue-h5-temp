<template>
  <div class="pay_page">
      <p class="pay_title">支付金额</p>
      <div class="flex_center price_info_box">
          <span>¥</span>
          <span class="price_show">{{detail.price}}</span>
      </div>
      <div class="flex_between pay_type">
          <span>微信支付</span>
          <span></span>
      </div>
      <div class="_sb_" style="margin-top:1.05rem" @click="onPay">
          确认支付
      </div>
  </div>
</template>

<script>
import "./index.css";
import { mapState ,mapActions} from "vuex"
export default {
    computed:{
        ...mapState('detail/',{
            detail: state =>state.detail,
        }),
        
    },
    methods:{
        ...mapActions('detail/',['pay']),
        onPay(){
           console.log(this.detail)
           this.$dialog.confirm({
                title: '提示',
                message: '确认支付购买？',
           }).then(()=>{
                let toast = this.$loading('加载中...')
                this.pay(this.detail.id).then(res=>{
                    toast.clear();
                    if(res.pay_url)
                    {
                       
                        window.location.replace(res.pay_url);
                        //  window.location.href=res.pay_url;
                         window.close();
                    }
                    else
                    {
                        this.$fail({
                            message:'支付失败'
                        })
                    }
                }).catch(()=>{
                    toast.clear();
                        this.$fail({
                            message:'支付失败'
                        })
                })
           }).catch(()=>{

           })
         
        }
    }
}
</script>

<style>

</style>