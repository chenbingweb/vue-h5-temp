<template>
    <div>
        <van-popup @closed="onCancel" v-model="showPop" position="bottom" :style="{ height: '40%' }">
            <van-picker show-toolbar :title="title" :columns="columns"  @confirm="onConfirm" @cancel="onCancel"/> 
        </van-popup>
    </div>
</template>

<script>
import { Popup,Picker } from 'vant';
export default {
        props:{
            title:{
                type:String,
                default:''
            },
            show:{
                type:Boolean,
                default:false
            }
        },
        components:{
            [Popup.name]:Popup,
            [Picker.name]:Picker
        },
        watch:{
            show:function(newVal){
                this.showPop=newVal
            }
        },
   
        data:function(){
            return {
                showPop:true,
                columns:[]
            }
        },
        mounted:function(){
            this._getYear_()
        },
        methods:{
            onConfirm:function(picker, value, index){
                this.showPop=false;
                this.$emit('confirm',picker)
            },
            onCancel:function(){
                this.showPop=false
                this.$emit('cancel')
            },
            _getYear_:function(){
                var now  =  new Date();
                var start =now.getFullYear()-10;
                var years =[start]
                for(var i=0;i<80;i++)
                {
                    start+=1;
                    years.push(start)
                }
                this.columns=years
            }
        }
}
</script>

<style>

</style>