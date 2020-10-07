<template>
    <div>
        <div class="play_box" v-if="lessionList.length">
            <!-- <player :list="lessionList" :video="sectionDetail.video_url"/> -->
            <player :list="lessionList" :sectionDetail="sectionDetail"/>
            <div class="detail_des">
                <p class="lession_des">课程简介</p>
                <div class="dec_detail relative" :style="{height:detail.is_buy==0?'5rem':'auto'}">
                    <div v-html="sectionDetail.content" style="padding-top:0.06rem;overflow:hidden" :style="{height:detail.is_buy==0?'4.5rem':'auto'}"></div>
                    <div class="more" @click="onLookMore" v-if="detail.is_buy==0">查看更多</div>
                </div>
            </div>
            <div class="bottom_buy" v-if="detail.is_buy==0">
                <pay-button ref="paybutton" :info="detail" :cid="cid+''" />
            </div>
        </div>
        <div v-else class="no_data">
            暂无数据
        </div>
    </div>

  
</template>

<script>
import { mapState ,mapActions} from "vuex";
import "./index.css";
import player from "../../components/playerBox/index.vue"
export default {
    components:{
        player ,
     
    },
    data(){
        return {
            cid:'',
            video:'',
            lessionList:[ ],
            html:''
        }
    },
    computed:{
        ...mapState('detail/',{
            detail:state=>state.detail,
           
        }),
         ...mapState('player/',{
            sectionDetail:state=>state.detail,
           
        }),
    },
    created(){
        let loading = this.$loading();
        this.cid = this.$route.query.id;
        // this.getSectionInfo({id:this.$route.query.id}).then(()=>{ })
            this.getDetail(this.$route.query.cid).then(()=>{
                //  this.detail = this.$store.state.detail.detail
                //  console.log()
                let list = [...this.$store.state.detail.detail.section_list]
                list.forEach(item=>{
                    if(item.id==this.$route.query.id)
                    {
                        item.current = true;
                    }
                    else
                    {
                        item.current = false;
                    }
                })
                this.lessionList =list;
                loading.clear();
            })
        
          
           
        
       
         
    },
    mounted(){
        this.init();
    },

    methods:{
        ...mapActions('player/',['getSectionInfo']),
         ...mapActions("detail/",['getDetail']),
        init(){
               $('html').css(
                       'background','#F8F9FA'
                )
                $('body').css(
                        {'padding-bottom':'1.2rem'}
                )
                this.paybutton = this.$refs.paybutton;

        },
        onLookMore(){
              this.paybutton = this.$refs.paybutton;
             this.paybutton.show=true;
        }
    }
}
</script>

<style>
    
</style>