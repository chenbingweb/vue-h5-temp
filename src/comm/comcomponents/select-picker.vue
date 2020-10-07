<template>
    <div>
        <van-popup @closed="onCancel" v-model="showPop" position="bottom" :style="{ height: '40%' }">
            <van-picker :default-index="defaultindex" :value-key="valuekey" show-toolbar :title="title" :columns="columns"  @confirm="onConfirm" @cancel="onCancel"/> 
        </van-popup>
    </div>
</template>

<script>
import { Popup,Picker   } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Picker.name]:Picker
    },
     props:{
            title:{
                type:String,
                default:''
            },
            show:{
                type:Boolean,
                default:false
            },
            columns:{
                type:Array,
                default:function(){
                    return []
                }
            },
            valuekey:{
                type:String,
                default:'name'
            },
            defaultindex:{
                type:Number,
                default:0
            }
        },
      
    watch:{
        show:function(newVal){
            this.showPop=newVal
        }
    },
    data:function(){
        return {
            showPop:false,
            
        }
    },
    methods:{
        _show(){
            this.showPop=true;
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