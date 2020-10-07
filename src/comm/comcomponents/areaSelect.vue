<template>
    <div>
        <van-popup @closed="onCancel" v-model="showPop" position="bottom" :style="{ height: '40%' }">
        <van-area
            :area-list="areaList"
            :value="value"
            @confirm="onConfirm"
            @cancel="onCancel"
            title=""
        />
    </van-popup>
    </div>
</template>

<script>
import { Popup,Area  } from 'vant';
import areaList from "./area.js"

export default {
    components:{
        [Popup.name]:Popup,
        [Area.name]:Area
    },
    props:{
            title:{
                    type:String,
                    default:''
            },
            showArea:{
                type:Boolean,
                default:false
            },
            value:{
                type:String,
                default:''
            }
        },
    watch:{
            showArea:function(newVal){
                this.showPop=newVal
            }
        },
    data:function(){
            return {
                showPop:false,
                areaList:areaList
            }
        },
    methods:{
            _show(){
                this.showPop=true
            },
            _hidden(){
                this.showPop=false
            },
            onConfirm:function(picker, value, index){
                this.showPop=false;
                this.$emit('confirm',picker)
            },
            onCancel:function(){
                this.showPop=false
                this.$emit('cancel')
            }
        }
    }
</script>

<style>

</style>