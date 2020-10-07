<template>
    <div class="_search_pop_">
        <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '100%' }"
        />
    </div>
</template>

<script>
import { Popup } from 'vant';
import "./index.css"
export default {
   
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            show:false
        }
    }
}
</script>

<style>

</style>