// import Tool from "../store/wxFn"
import Vue from 'vue';
const wx = window.wx ||null;
export default function(Vue){
   
    
       //分享提示
    /*
        <p v-share="config"></p>
        config:{
                    url:'http://jorntest.vipgz1.idcfengye.com/config',
                    shareConfig:{
                        dis:'描述测试',
                        title:'分享测试',
                        link: window.location.href,
                        imgUrl:'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a9e671b9a551f3dedcb2bf64a4eff0ec/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg' 
                    }
                }
    */ 
    Vue.directive('share',{
        inserted: function (el,binding) {
        
            let vue = new Vue({
                data:{
                    binding
                },
            })
            var config = binding.value;
            vue.$watch('binding', ()=>{
                config = binding.value;
                console.log(config)
                if(wx)
                {  
                    var shareTimeLineContent = {
                        title: config.shareConfig.title,
                        link:  config.shareConfig.link,
                        imgUrl: config.shareConfig.imgUrl
                    }, shareAppMessageContent = {
                        title: config.shareConfig.title,
                        desc: config.shareConfig.dis,
                        link:  config.shareConfig.link,
                        imgUrl:config.shareConfig.imgUrl,
                        type: 'link'
                    };
                
                    wx.updateAppMessageShareData(shareAppMessageContent);
                    wx.updateTimelineShareData(shareTimeLineContent);
                    wx.onMenuShareTimeline(shareTimeLineContent);
                    wx.onMenuShareAppMessage(shareAppMessageContent);
                }
            }, {
                deep: true
              })
            console.log(binding)
           
            
       
         
         
            var mask=$(`<div style="position:fixed;left:0;top:0;bottom:0;right:0;background-color:rgba(0,0,0,0.8)">
                <img style="position:absolute;left:50%;top:50%;transform:translateX(-50%) translateY(-100%)" src="data:image/png;base64,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" />
            </div>`)
            //聚焦元素
            $(el).click(function(){
                console.log(el)
                $('body').append(mask);
                mask.click(function(){
                    mask.remove();
                })
                return false
            })
            console.log(config)
             //Ajax
           
            // function initWX(){
                
          

           
        }
    })
   
    //通过微信选择图片上传
    /*
    {
        imgCallBack:function(res){},//回调 返回basw64
        num:1,//上传图片张数
        cache:true //开启缓存
    }
     
    */
    Vue.directive('wx-upload-img',{
        bind:function(el,binding){
            var localBase = [];
            console.log(binding)
            var config = binding.value;
            console.log(config)
            $(el).click(function(){
                if(!config.cache)
                {
                    localBase = [];
                }
                
                wx.chooseImage({
                    count:(config.num-localBase.length) || (9-localBase.length), // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        imgData(res.localIds, 0)
                    }
                });
                return false
            })
           
           
            
            function imgData(localIds, i) {
                console.log(i)
                if (i >= localIds.length) {
                    console.log('ok', localBase.length)
                    config.imgCallBack && config.imgCallBack(localBase)
                    return
                }
                wx.getLocalImgData({
                    localId: localIds[i], // 图片的localID
                    success: function (res) {
                        // console.log(res)
                        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                        //var storeAs = Math.floor(Math.random()*100+1);
    
                        // var blob = dataURLtoBlob(localData);
                        // var file = blobToFile(blob, storeAs);
                        //var file = dataURLtoFile(localData,storeAs);
    
                        localBase.push(localData)
                        i += 1
                        imgData(localIds, i)
                    }
    
                });
            }
        }
    })
    //微信地图导航
    /*
        {
            lat,// 纬度，浮点数，范围为90 ~ -90
            lng,// 经度，浮点数，范围为180 ~ -180。
            name,// 位置名
            address,//  // 地址详情说明
            scale,// 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl// 在查看位置界面底部显示的超链接,可点击跳转
        }
    
    
    */
    Vue.directive('openmap',{
        inserted: function (el,binding) {
            var config = binding.value||{};
            $(el).click(function(){
                console.log(11)
                if(wx)
                {
                   
                    wx.openLocation({
                        latitude: config.lat||23.099994, // 纬度，浮点数，范围为90 ~ -90
                        longitude:config.lng||113.324520, // 经度，浮点数，范围为180 ~ -180。
                        name:config.name||'', // 位置名
                        address:config.address||'', // 地址详情说明
                        scale: config.scale||14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl:config.infoUrl|| '' // 在查看位置界面底部显示的超链接,可点击跳转
                      });
                }
            })
        }
    })
}