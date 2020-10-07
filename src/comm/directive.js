import Velocity from 'velocity-animate'
import _Vue from "vue"
// 地区选择器
import AreaSelect from "./comcomponents/areaSelect.vue";
//通用选择器
import SelectPicker from "./comcomponents/select-picker.vue";
// 日期选择器
import _Date from "./comcomponents/date.vue";

export default function(Vue){
    // console.log(Velocity)
    function _create(Component, props) {
        const vm = new Vue({
            render(h) {
                
                return h(Component, {props})
            }
        }).$mount();
        document.body.appendChild(vm.$el);
        const comp = vm.$children[0];
        comp.remove = function() {
            document.body.removeChild(vm.$el);
            vm.$destroy();
        }
        return comp;
    }
    //焦点事件
    /*
        <p v-focus>
            <input/>
        </p>
        <p v-focus>
            <textare/>
        </p>
    */
    Vue.directive('focus', {
       // 当被绑定的元素插入到 DOM 中时……
       inserted: function (el) {
           const windowHeight = window.innerHeight;
           function bindFn(ele){
               if(ele)
               {
                   ele.addEventListener('blur', function () {
                     
                       var windowFocusHeight = window.innerHeight
                       if (windowHeight == windowFocusHeight) {
                         return
                       }
                       var currentPosition;
                       var speed = 1; //页面滚动距离
                       currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                       currentPosition -= speed;
                       window.scrollTo(0, currentPosition); //页面向上滚动
                       currentPosition += speed; //speed变量
                       window.scrollTo(0, currentPosition); //页面向下滚动
                     })
               }
           }
           // 聚焦元素
           $(el).click(function(){
               $(this).find('input').focus()
               $(this).find('textarea').focus()
               bindFn($(this).find('input')[0])
               bindFn($(this).find('textarea')[0])
               console.log($(this).find('input'))
            
               return false
           })
           if(/Android [4-6]/.test(navigator.appVersion)) {
                console.log("Android [4-6]")
                window.addEventListener("resize", function() {
                    if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
                    console.log("Android [4-6]2")
                    window.setTimeout(function() {
                        document.activeElement.scrollIntoViewIfNeeded();
                        console.log("Android [4-6]3")
                    },0);
                    }
                })
            }
       }
   })

   //计时器
   /*
     <p class="get_code" v-code="config">获取验证码</p>
     data:()=>{
         return {
              config: {
                    callback: function () {}
                }
         }
     }
     created:()=>{
          this.config.callback = this.timeCallback
     },
     methods:{
          timeCallback: function (time) {
                    //开始计时
                    time()()
        }
     }
   */
   Vue.directive('code',{
       bind:function(el,binding){
           var flag =true;
           var config = binding.value;
           var text = $(el).text()
           $(el).click(function(){
               if(flag==false) return 
               config.callback && config.callback(inner);
              
               
               
               // inner()()
               console.log(config)
           })

           function inner(){
               var time = config.time||60;
               flag=false;
               return function callee(){
                   if(time<=0)
                   {
                       flag=true;
                       $(el).text(text);
                       return 
                   }
                   //var next = callee
                   $(el).text(time+'s');
                   time -=1;
                   setTimeout(function(){
                    callee()
                   },1000)
                  
               }
           }
       
           
       },
       inserted:function(el){
           console.log(el)
       },
       
   })
   //地区选择
   Vue.directive('area',{
    inserted(ele,binding){
        let config = binding.value;
        let com=null;
        try{
            com= _create(AreaSelect,{value:config.value||''}) 
            if(config.callback)
            {
                com.$on('confirm',res=>{
                    config.callback && config.callback(res)
                 })
                //  com.$on('cancel',()=>{
                //     com.remove()
                // })
            }
           
        }catch(e){
            console.warn(`area指令使用：
                                    <p v-area="config">选择地址</p>
                                    data:{
                                        config:{
                                            value:'',//当前选中的省市区 code 110102
                                            callback:(res)=>{
                                                console.log('返回选择的数据',res)
                                            }
                                        }
                                        
                                    }
                        `)
        }
        
        $(ele).click(function(){
            com._show()
            console.log(com)
        })
        // console.log(ele)
    }
   })
   //通用选择器
   Vue.directive('pickers',{
    inserted(ele,binding){

        let config = binding.value;
        console.log(config)
        let com=null
        try{
            com = _create(SelectPicker,{ 
                columns:config.columns||[],
                valuekey:config.valuekey||'',
                defaultindex:config.defaultindex||0}) 
            if(config.callback)
            {
                com.$on('confirm',res=>{
                    config.callback && config.callback(res)
                 })
                // com.$on('cancel',()=>{
                //     com.remove()
                // })
            }
            if(config.newFn)
            {
                config.newFn(com)
            }
        }catch(e){
            console.warn(`pickers指令使用：
                    <p v-pickers="config">选择</p>
                    data:{
                        config:{
                            columns:[],//对象数组，配置每一列显示的数据
                            valuekey:'name',//选项对象中，文字对应的 key
                            defaultindex:'',//单列选择器的默认选中项索引，多列选择器请参考下方的 Columns 配置
                            callback:(res)=>{//回调返回值
                                console.log(res)
                            }
                        }
                    }
            `)
        }
        
        $(ele).click(()=>{
            com._show()
            return false
        })
    }

   })
   //日期选择器
   Vue.directive('date',{
        inserted(ele,binding){
            let config = binding.value;
        let com=null
        try{
            com = _create(_Date,{ 
                datetime:config.datetime||'date',
               }) 
            if(config.callback)
            {
                com.$on('confirm',res=>{
                    config.callback && config.callback(res)
                 })
                // com.$on('cancel',()=>{
                //     com.remove()
                // })
            }
        }catch(e){
            console.warn(`area指令使用：
                    <p v-date="config">日期选择</p>
                    data:{
                        config:{
                            datetime:'date',//date year-month datetime
                            callback:(res)=>{//回调返回值
                                console.log(res)
                            }
                        }
                    }
            `)
        }
        
        $(ele).click(()=>{
            com._show()
            return false
        })
        }
   })
   Vue.directive('move',{
        inserted(ele,binding){
           let p_arr = $(ele).find('p');
           let line_1 = p_arr[0];
           let line_2 = p_arr[1];
           let line_3 = p_arr[2];
           let line_4 = p_arr[3];
           let line_5 = p_arr[4];
         
           Velocity(line_1, {translateX: "-500px", }, { 
             duration: 0,   
           })
           Velocity(line_2, {translateX: "-500px", }, { 
            duration: 0,   
          })
          Velocity(line_3, {translateX: "-500px", }, { 
            duration: 0,   
          })
          Velocity(line_4, {translateX: "-500px", }, { 
            duration: 0,   
          })
          Velocity(line_5, {translateX: "-500px", }, { 
            duration: 0,   
          })
          function scaleFn(ele){
            Velocity(ele, {scale: 1.4, translateX: "0px",}, { 
                duration: 300,
            }).then(()=>{
                Velocity(ele, {scale: 1, translateX: "0px",}, { 
                    duration: 300,
                })
            })
          }
          let vue = new _Vue({
               data:{
                binding
               }
           })
           vue.$watch('binding', (newVal)=>{
               
                if(newVal)
                {
                    Velocity(line_1, {translateX: "0px", }, { 
                        duration: 500,
                        // delay: 1000,
                    }).then(()=>{
                        scaleFn(line_1)
                       return Velocity(line_2, {translateX: "0px", }, { 
                            duration:500,
                            })
                    }).then(()=>{
                        scaleFn(line_2)
                       return Velocity(line_3, {translateX: "0px", }, { 
                             duration: 500,
                            })
                    }).then(()=>{
                        scaleFn(line_3)
                        return Velocity(line_4, {translateX: "0px", }, { 
                              duration: 500,
                         })
                     }).then(()=>{
                        scaleFn(line_4)
                        return Velocity(line_5, {translateX: "0px", }, { 
                              duration:500,
                         }).then(()=>{
                            scaleFn(line_5)
                         })
                     });
                    // Velocity(line_1, {translateX: "-1000px", }, { 
                    //     duration: 0,   
                    // }).then(()=>{
                    // return Velocity(line_1, {translateX: "0px", }, { 
                    //         duration: 4000,
                        
                    //         delay: 1000,
                        
                    //     });
                    // }).then(()=>{
                    //     return Velocity(line_1, {translateX: "100px", }, { 
                    //         duration: 1000
                    //     });
                    // });
                }
           }, {
                deep: true
              })
           
     
        }
   })
   Vue.directive('autofocus',{
    inserted(ele){
      
        ele.focus()
       
        
    }
   })
}