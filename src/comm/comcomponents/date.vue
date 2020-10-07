<template>
   <van-popup @closed="onCancel" v-model="showPop" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker   :min-date="minDate" v-model="currentDate" :type="datetime" @confirm="onConfirm" v-on:cancel="onCancel"/>
    </van-popup>
</template>

<script>
import { Popup,DatetimePicker   } from 'vant';
export default {
        components:{
            [Popup.name]:Popup,
            [DatetimePicker.name]:DatetimePicker
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
            datetime:{
                type:String,
                default:'date'
            },
            currentval:{
                type:String,
                default:''
            }
        },
      
        watch:{
            show:function(newVal){
                this.showPop=newVal
            },
            currentval:{
                　　handler:function(newName, oldName) {
                  　　if(newName)
                     { 
                        this.currentDate=new Date(newName.replace(/-/g,'/'))
                     }
                     else
                     {
                        this.currentDate=new Date()
                     }
                　　},
                　　immediate: true
                }
        },
        data:function(){
            return {
                showPop:false,
                currentDate: '',
                minDate:new Date('1970/01/01'),
                
            }
        },
        mounted:function(){
            
        },
        methods:{
            _show(){
                 this.showPop=true
            },
            onConfirm:function(value){
               if(this.datetime=='datetime'||this.datetime=='date')
               {

               
                    this.showPop=false;
                    var date=value.getFullYear()+'-'+((value.getMonth()+1)<10?('0'+(value.getMonth()+1)):(value.getMonth()+1))+'-'+(value.getDate()<10?('0'+value.getDate() ):value.getDate())
                    
                    //选择时间显示
                    if(this.datetime=='datetime')
                    {   
                        var h =  value.getHours();
                        var m = value.getMinutes();
                        var time =(h<9?('0'+h):h)+":"+(m<9?('0'+m):m);
                        date+=' '+time
                    }
                    this.$emit('confirm',date)
                }
                if(this.datetime=='time')
                {
                    this.$emit('confirm',value)
                }
            },
            onCancel:function(){
                this.showPop=false
                this.$emit('cancel')
            },
            
        }
}
</script>

<style>

</style>