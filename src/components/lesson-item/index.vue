<template>
    <router-link :to="{path:'/detail',query:{id:item.id}}" class="_lesson flex_between">
        <div class="img_box" >
            <img :src="item.list_cover"/>
            <!-- <div class="doc_info girle flex_start">
                <p class="doc_name one_line">何静杰</p>
                <p class="doc_center one_line">中国康复研究中心 药理科</p>
            </div> -->
        </div>

        <div class="lesson_info">
           <div>
                <p class="lesson_title two_line">{{item.name}}</p>
                <p class="lesson_desc two_line">{{item.desc}}</p>
           </div>
           <div class="flex_between lesson_price_info">
                <div>
                    <span class="lesson_num">{{item.section_num}}节课</span>
                    <span class="study_num">{{item.read}}人学过</span>
                </div>
                <div v-if="ty=='info'" class="_price_1">¥{{item.price}}</div>
                <div v-if="ty=='zj'" class="_detail_btn_">查看详情</div>
                <div v-if="ty=='lession'" class="_detail_btn_">立即学习</div>
                <div v-if="ty=='is_buy'" class="_detail_btn_" style="border-color:transparent;text-align: right;">已购</div>
           </div>
        </div>
    </router-link>
</template>

<script>
import "./index.css"
import img from "../../images/img/t_2.jpg"
export default {
    props:{
        ty:{
            type:String,
            default:'info'
        },
        item:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {
            img
        }
    }
}
</script>

<style >

</style>>

