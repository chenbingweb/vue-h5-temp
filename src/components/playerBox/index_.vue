<template>
  <div class="player_box_inner">
      <div class="box_audio flex_center">
        <img v-if="!videoShow" :src="audioImg" alt="">
        <div v-else>
            <div v-if="video">
               <avideo :src="video"/>
            </div>
           
        </div>
        
      </div>
      <div class="lesson_title_audio">
        <span>「{{index+1}}」-</span>
        <span>{{music.name}}</span>
      </div>
      <div :style="{'margin-top':videoShow?'1rem':'0rem'}">     
        <div v-if="!videoShow" class="flex_center process " :class="loadPer>=100?'load_ok':''">
          
          <div class="flex_center process_bg relative">
             <p class="loading_process" :style="{width:loadPer+'%'}"></p>
            <span class="p_c" ></span>
            <!-- #ee0a24 -->
           
              <van-slider class="bar" :disabled="$store.state.detail.detail.is_buy==0" @change="onChange" inactive-color="#ddddd" v-model="value" active-color="#ddddd">
                <template #button>
                  <div class="custom-button"  @touchstart.prevent="touchStart" @touchend="touchEnd">
                    {{ currentTime }}
                  </div>
                </template>
              </van-slider>
         
            <span  class="p_c"></span>
          </div>
        </div>
        <div class="flex_center control_box_video">
          <div class="video_btn flex_center"  @click="onVideo">
            <div class="vedio_icon" ></div>
            <p>{{!videoShow?'播放视频':'播放音频'}}</p>
          </div>
          <!-- <div class="video_btn flex_center">

          </div> -->
          
          <div class="pre_play" @click="onPre"></div>
          <!-- :class="{pause:playFlag}" -->
          <div class="play flex_center" >
            <div class="flex_center" v-if="!loading" style="width:1.733333rem;height:1.733333rem">
               <div class="play_btn" v-if="!playFlag"  @click="onPlay"></div>
               <div class="pause_btn" v-else  @click="onPlay"></div>
            </div>
            <div class="flex_center" v-else style="width:1.733333rem;height:1.733333rem">
               <van-loading type="spinner"/>
            </div>
           

          </div>
          <div class="next_play"  @click="onNext"></div>
          <div class="video_btn flex_center" @click="onShowList">
            <div class="vedio_icon_list"></div>
            <p>播放列表</p>
          </div>
        </div>
      </div>
      <div class="lession_list_box">
        <van-popup
          v-model="show"
          closeable
          position="bottom"
          :style="{ height: '50%' }"
           
        >
          <div>
            <p class="plist_title">播放列表</p>

            <div class="plist_box">
              <page-scroll>
                <div>
                    <div class="audio_item flex_between" @click="onSelect(item)" v-for="(item,index2) in audioList" :key="index2">
                      <div class="flex_start audio_title" >
                        <span class="item_num" :class="{'active_title':index2==index}">「{{index2+1}}」-</span>
                        <span class="one_line item_title_audio" :class="{'active_title':index2==index}">{{item.name}}</span>
                      </div>
                      <span :class="{player_icon:true,plyaer_icon_active:index2==index}"></span>
                    </div>
                </div>
                 
              </page-scroll>
               
            </div>
          </div>
        </van-popup>
      </div>
      <!-- v-show="false" preload="auto"-->
      <div class="_audio_">
        <aplayer :music="music"
          preload="auto"
          @progress="progress" 
          @playing="playing"
          @play="play"
          @timeupdate="timeupdate"
          @waiting="waiting"
          @pause="pause"
          @loadstart="loadstart"
          @loadedmetadata="loadedmetadata"
          @loadeddata="loadeddata"
          @ended="ended"
          ref="aplayer"
        />
       </div>
  </div>
</template>

<script>
import AVideo from "../video-item/index.vue"
import Aplayer from 'vue-aplayer'
import { Slider,Popup  } from 'vant';
import "./index.css";
import audioImg from "../../images/audio_fm_pic.png"
export default {
  props:{
    list:{
      type:Array,
      default:function () {
        return []
      }
    },
    video:{
      type:String,
      default:''
    }
    
  },
  watch:{
    list:{
      handler(n){
        //debugger
        if(n.length==0) return
        let lists =[]
        n.forEach(item=>{
            lists.push({
              url:item.url,
              time:item.time,
              current:item.current,
              id:item.id,
              name:item.name
            })
        })
        this.audioList=n;
        n = lists ;
        console.log(this.audioList)
        let item = n.find(item=>item.current==true);
        let index = n.findIndex(item=>item.current==true);
        if(index<0)
        {
          index=0;
        }
        // this.index=index;
        if(item)
        {
           this.onSelect(item);
           
        }
        else
        {
           this.onSelect(n[0])
        }
       
      },
       immediate:true
      
    }
  },
  components:{
    [Slider.name]:Slider,
    [Popup.name]:Popup ,
    aplayer:Aplayer,
    avideo:AVideo
  },
 
  computed:{
    showTime(){
      return `12:${this.value}/12:00`
    }
  },
  data(){
    return {
      videoShow:false,
      loading:false,
      audioList:[],
      music:{
      
      },
      show:false,
      value:0,
      audioImg:audioImg,
      currentTime:'00:00',
      playFlag:false,
      loadPer:0,//加载百分比
      index:0,//播放课程第几首
    }
  },
  mounted(){
    this._aplayer = this.$refs.aplayer;
    this.totalTime='00:00'
    // console.log(this._aplayer.audio.currentTime)
  },
  methods:{
    //视频切换
    onVideo(){
      if(this.video)
      {
        if(this.$store.state.detail.detail.is_buy==0)
        {
          this.$alert('您尚未购买')
          return 
        }
        this.videoShow = !this.videoShow;
      }
      else
      {
        this.$alert('暂无视频')
      }
      //this.$set(this.music,'video',!this.music.video)
    },
    //在媒体开始加载时触发。
    loadstart(e){
      this.loadProcess(e)
      this.loading=true
      console.log('loadstart')
    },
    //媒体的第一帧已经加载完毕。
    loadeddata(e){
      

      console.log('loadeddata')
       this.totalTime=this.timeToMin(this._aplayer.audio.duration);
      this._aplayer.audio.currentTime=this.music.time;
        this.loadProcess(e)
    },
    //已经加载完毕
    loadedmetadata(e){
       this.loading=false
       setTimeout(()=>{

        this.totalTime=this.timeToMin(this._aplayer.audio.duration);
        this.currentTime=`${this.timeToMin(this.music.time)}/${this.totalTime}`;
        this.value =this.music.time/this._aplayer.audio.duration * 100// parseInt();
        this.loadPer = this.value
       },0)
         
    //      console.log('this.value',this.value)
    //    console.log('this.currentTime',this.currentTime)
    // setTimeout(()=>{   
    //       this.totalTime=this.timeToMin(this._aplayer.audio.duration);
    //       this._aplayer.audio.currentTime=this.music.time;
    //      // this.loadProcess(e)
    //      this.loadPe =this.music.time/this._aplayer.audio.duration * 100// parseInt();
    //      this.timeupdate(e)
    //   },300)

      //  console.log('this.loadPe ',this.loadPe )
    // console.log(' this._aplayer.audio.currentTime', this._aplayer.audio.currentTime)
    // console.log('loadedmetadata',this._aplayer.audio.duration)
        
    
    },
    //点击进度bar
    touchStart(){
      if(this.$store.state.detail.detail.is_buy==0)
        {
          //this.$alert('您尚未购买')
          return 
        }
      this._aplayer.pause()
    },
    touchEnd(){
      if(this.$store.state.detail.detail.is_buy==0)
        {
          // this.$alert('您尚未购买')
          return 
        }
       this._aplayer.play()
    },
    //进度发生改变
    onChange(val){
      if(this.$store.state.detail.detail.is_buy==0)
      {
      // this.$alert('您尚未购买')
      return 
      }
      console.log(val)
     
      this._aplayer.audio.currentTime = this._aplayer.audio.duration * (val/100);

    },
    onPlay(){
      if(this.$store.state.detail.detail.is_buy==0)
      {
        this.$alert('您尚未购买')
        return 
      }
     if(this.playFlag)
     //if(!this._aplayer.audio.paused)
      {
        this._aplayer.audio.pause()
      }
      else
      {
       
        this._aplayer.audio.play()
        
       
      }
      
    },
    onShowList(){
       if(this.$store.state.detail.detail.is_buy==0)
        {
          this.$alert('您尚未购买')
          return 
        }
      this.show=true;
    },
    onSelect(item,flag){
      this.loadPer=0;
      this.currentTime='00:00/00:00'
      this.index = this.audioList.findIndex(child=>child.id==item.id)
      this.value=0;
      this.show=false;
      console.log(this.music.src)
      this.music={
        src:item.url,
        ...item
      }
      console.log(this.music.src)
      
      if(this._aplayer&& !flag)
      {
        this._aplayer.audio.src=this.music.src;
        console.log(this._aplayer.audio)
        setTimeout(()=>{
          this._aplayer.audio.play()
        },20)
      
      }
      // this._aplayer.audio.play()
    },
    //下载进度
    progress(e){
      console.log(e)
    },
    //开始播放
    playing(){
      console.log('开始播放')
      this.playFlag=true;
      this.loading=false;
      this.totalTime=this.timeToMin(this._aplayer.audio.duration)
    },
    //播放
    play(){
      console.log('播放')
       this.playFlag=true;
    },
    //暂停播放
    pause(){
      this.playFlag=false;
      console.log('暂停播放')
    },
    //播放停止
    ended(){
     
      setTimeout(()=>{
 //调用下一曲
      this.onNext()
      },20)
     
    },
    //currentTime属性表示的时间已经改变。
    timeupdate(e){
      //console.log('timeupdate',this._aplayer.audio.currentTime)
      this.currentTime=`${this.timeToMin(this._aplayer.audio.currentTime)}/${this.totalTime}`;
    //  console.log('this.currentTime',this.currentTime)
      this.value =this._aplayer.audio.currentTime/this._aplayer.audio.duration * 100// parseInt();
      //console.log(this.value)
      // console.log(this. timeToMin(this._aplayer.audio.currentTime))
      this.loadProcess(e);
      this.playFlag=!this._aplayer.audio.paused
    },
    //下载进度提示
    loadProcess(e){
      let time = 0
      if (parseInt(e.target.currentTime) !== Number(time)) {
          time = parseInt(e.target.currentTime)
          const timeRanges = this._aplayer.audio.buffered;
          // console.log(timeRanges)
          // 获取已缓存的时间  timeRanges.end(timeRanges.length - 1)
          let p =  parseInt(timeRanges.end(timeRanges.length - 1) * 100 / this._aplayer.audio.duration * 100) / 100;
          this.loadPer=p;
      }
    },
    //等待
    waiting(){
      console.log('等待')
    },
    //时间显示
    timeToMin(time){
        //分钟
      var minute = time / 60;
      var minutes = parseInt(minute);
      if (minutes < 10) {
          minutes = "0" + minutes;
      }
      //秒
      var second = time % 60;
      var seconds = Math.round(second);
      if (seconds < 10) {
          seconds = "0" + seconds;
      }
      return `${minutes}:${seconds}`
    },
    //上一曲
    onPre(){
      if(this.$store.state.detail.detail.is_buy==0)
      {
        this.$alert('您尚未购买')
        return 
      }
      if( this.index==0){
        console.log('上一曲结束')
        return
      }
      let preIndex = this.index-1;
      
      if(preIndex<0)
      {
        preIndex = 0
      }
       this.onSelect(this.audioList[preIndex])
      console.log(this.audioList[preIndex])
    },
    //下一曲
    onNext(){
      if(this.$store.state.detail.detail.is_buy==0)
      {
        this.$alert('您尚未购买')
        return 
      }
      // if(this.index==this.audioList.length-1){
      //   console.log('下一曲结束')
      //   return
      // }
      let flag = false;
      let nextIndex = this.index+1;
      if(nextIndex>this.audioList.length-1)
      {
        nextIndex = this.audioList.length-1;
        flag = true;
      }
     
      this.onSelect(this.audioList[nextIndex],flag)
      console.log(this.audioList[nextIndex])
    }
  }
}
</script>

<style>
  ._audio_
  {
    position: absolute;
    opacity:0;
    pointer-events: none;
  }
</style>