import { tool } from "../libs/Tool"
import _interface from "../interface/interface"
import Vue from "vue"
const wx=window.wx;
class WXFN{
    constructor(){
        this._vue=new Vue();
    }
    //callBack,
    InitJsTicket(path){
        let  jsApiList=[
                'getLocalImgData',
                'getLocation',
                'previewImage',
                'chooseWXPay',
                'chooseImage',
                'uploadImage',
                'hideMenuItems',
                'hideAllNonBaseMenuItem',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'closeWindow',
                'updateAppMessageShareData',

                'updateTimelineShareData',
                'scanQRCode'
            ]
        //配置微信菜单按钮
        let hiddenList=[
            /** 基本类 **/
             "menuItem:exposeArticle",// 举报:
             "menuItem:setFont",// 调整字体: 
            // "menuItem:dayMode",//日间模式: 
            // "menuItem:nightMode",//夜间模式: 
            // "menuItem:refresh",//刷新: 
            /** 传播类 **/ 
            // 'menuItem:share:appMessage',//发送给朋友
            //'menuItem:share:timeline',//分享到朋友圈
            'menuItem:share:qq',//分享到QQ:
            'menuItem:share:weiboApp',//分享到Weibo
            'menuItem:favorite',//收藏
            'menuItem:share:facebook',//分享到FB
            'menuItem:share:QZone',//分享到 QQ 空间
            /** 保护类 **/ 
            'menuItem:editTag',//编辑标签
            'menuItem:delete',//删除
            'menuItem:copyUrl',//复制链接:
            'menuItem:originPage',//原网页
            'menuItem:readMode',//阅读模式
            'menuItem:openWithQQBrowser',//在QQ浏览器中打开
            'menuItem:openWithSafari',//在Safari中打开
            'menuItem:share:email',//邮件
            'menuItem:share:brand'//一些特殊公众号
        ]
              // 记录进入app时的url
        console.log('url:',path)
        tool.fetchPost(_interface.wxJsTicket,{
            url:path
        }).then(res=>{
          
           
            if(res.errcode==0)
            {
                let jo=res.data;
                if(wx)
                {
                    wx.config({
                        debug:jo.debug||false,
                        appId: jo.appId,
                        timestamp: jo.timestamp,
                        nonceStr: jo.nonceStr,
                        signature: jo.signature,
                        jsApiList:jsApiList
                    });
                 
                        wx.ready(()=>{
                           
                                wx.checkJsApi({
                                    jsApiList:[
                                        'hideMenuItems',
                                        'hideAllNonBaseMenuItem'
                                    ],
                                    success:function(result){
                                        
                                        //要隐藏的菜单项,只能隐藏"传播类"和"保护类"按钮,所有menu项见附录3
                                        wx.hideMenuItems({
                                            menuList:hiddenList
                                        });

                                       // wx.hideAllNonBaseMenuItem();
                                       // callBack && callBack()
                                    },
                                    fail:function(err){
                                        console.log('隐藏菜单')
                                    }
                                });
                                this._vue.$emit('_wxready_')
                                
                           
                        }); 
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        wx.error((err)=>{
                           
                            console.log('config信息验证')
                           // window.history.back()
                        //    if(tool.isIos())
                        //    {
                        //      window.history.back()// this.InitJsTicket(window.location.href)
                        //    }
                        //this.InitJsTicket()
                            
                            console.log(err)
                        });
                 
                   
                }
               
            }
            
        }).catch(err=>{

            console.log(err)
        })
    }
    WXLogin(callBack){
        // debugger
        console.log('****',window.location.href)
        let code=this.GetUrlPara('code');
        
        //判断是否有code,有code就微信登录
        if(code)
        {
            tool.fetchPost(_interface.getUserInfo,{code}).then(res=>{
                
               // sessionStorage.setItem('token',res.data.token);
              
                callBack()
                // if(tool.isIos())
                // {
                  
                //   WXFN.InitJsTicket(window.location.origin+to.fullPath)
                // }
              
            }).catch(err=>{
                console.log(err)
               // this.GetWXURL()
            })
        }
        // else if(sessionStorage.getItem('token'))
        // {
        //    console.log(process.env.NODE_ENV=='development')
        //    debugger
        //   //this.InitJsTicket(callBack)
        //     //测试
        //      //模拟测试
        // //      let r=parseInt(3*Math.random()) 
        // //      let role=['team_member','captain',''][r]
        // //      //end
        // //     User.updataUserInfo({
        // //         avatar:'http://www.pptbz.com/pptpic/UploadFiles_6909/201406/2014063021281300.gif',
        // //         team_name:'精彩人生',
        // //         nickname:'jorn',
        // //         realname:'张三',
        // //         team_num:12,
        // //         role:role,
        // //         Authentication:role!==''
        // //     })
        //     // //开发环境
        //     if(process.env.NODE_ENV=='development')
        //     {
               
           
        //         callBack && callBack()
        //     }
        //     else
        //     {

        //         //  if(tool.isIos())
        //         // {
        //         //     this.InitJsTicket(window.location.href)
        //         // }
        //     }
         
        // }
        //否则跳转微信授权页面
        else
        {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userInfo");
           // this.InitJsTicket(callBack)
            //开发环境
            if(process.env.NODE_ENV=='development')
            {
               
               
                callBack && callBack()
                this.GetWXURL()
                //this.InitJsTicket(callBack)
            }
            else
            {
                // this.InitJsTicket(callBack)
                this.GetWXURL()
            }
          
        }
    }
    GetWXURL(){
        tool.fetchPost(_interface.login,{url:window.location.href}).then(res=>{
            if(res.errcode==0)
            {
                window.location.href=res.data.url
               // document.location.replace(res.url)
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }
    //获取url上的查询字段
	GetUrlPara(str)
	{
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) 
		{
			return unescape(r[2]); 
		}else
		{
			return null;
		}
		
	}
}
export default new WXFN();
