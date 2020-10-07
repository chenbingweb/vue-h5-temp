import Year from "./comcomponents/year.vue";
import Paging from "./comcomponents/paging.vue";
import pagingChild from "./comcomponents/paging-child.vue";

import PageScroll from "./comcomponents/page-scroll.vue"
import AreaSelect from "./comcomponents/areaSelect.vue";
import Title from "../components/title-item/index.vue";
import lessonItem from "../components/lesson-item/index.vue";
import searchPage from "../components/search-page/index.vue";
import audioItem from "../components/audio-item/index.vue";
import PayButton from "../components/pay-bottom/index.vue";
import { Image as VanImage ,Loading  } from 'vant';
import FileUpload from "./comcomponents/upload-file.vue";
export default function(Vue){
    Vue.use(Loading);
    Vue.component('pageScroll',PageScroll)
    Vue.component('pagingChild',pagingChild);
    Vue.component('uploadFile',FileUpload);
    Vue.component('year',Year)
    /*分页组件
        <paging @pagedata="onPageData" ref="page" :outdata="outData">
            <div class="list" v-for="(item,index) in list" :key="index">1212</div>
        </paging>
        data:()=>{
            return {
                list:[],
                outData: {
                        key: '',
                        status:'',
                        path: 'http://web05.jeemoo.net:8083/mock/5da017e1f56a3f7aa9aa0485/test/list'
                },
            }
        }
       methods:{
                onPageData: function (list) {
                    console.log(list)
                    this.list = this.list.concat(list)
                },
       }

       
    */ 
    Vue.component('paging',Paging);
    //地区选择
    Vue.component('area-select',AreaSelect);
    /*本项目扩展*/
    Vue.component('titleItem',Title);
    //课程组件
    Vue.component("lessonItem",lessonItem);
    Vue.use(VanImage);
    Vue.component('searchPage',searchPage);
    Vue.component('audioItem',audioItem);
    Vue.component('payButton',PayButton)
}