<template>
  <div class="home">
    <div class="test" ref="container">test</div>
  </div>
</template>

<script>
// import { Button } from "vant"

import { Tab, Tabs } from "vant";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Tool from "../../libs/Tool";
import { chartFn } from "@/libs/echarts.js";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data() {
    return {};
  },
  created() {
    // let loading = this.$loading();
    // Promise.all([
    //   this.getBanner(),
    //   this.getClassify(),
    //   this.getRecommendCourse(),
    //   this.alertAd({}),
    // ]).then((res) => {
    //   loading.clear();
    // });
    //this.getBanner();
  },
  computed: {
    ...mapGetters("home/", [
      "banner",
      "classify",
      "recommend",
      "indexClassify",
    ]),
  },
  mounted() {
    console.log(this.$store);
    var myChart = chartFn(this.$refs.container);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
  methods: {
    ...mapActions("home/", [
      "getBanner",
      "getClassify",
      "getRecommendCourse",
      "alertAd",
    ]),
    ...mapMutations(["setCategory"]),
    onNavTo(item) {
      this.setCategory(item.id);
      this.$router.push({ path: "/lessonlist", query: { id: item.id } });
    },
    onPageData(res) {
      this.list = [...this.list, ...res];
    },
    onTab(name, title) {
      this.outData.ty = name;
      console.log(name, title);
    },
    onToDetail(item) {
      // this.$router.push({name:'detail',params:{id:item.id}})
      this.$router.push({ path: "/detail?id=" + item.id });
      //this.$router.push({path:'/tests?id='+item.id})
    },

    onShows() {
      this.showArea = true;
    },
    onConfirmArea() {
      this.showArea = true;
    },
    onCancelArea() {},
    onToCenter() {
      this.$router.push({ path: "/mycenter" });
    },
    onLogin() {
      this.$router.push({ path: "/detail?id=3" });
      // window.location.href="/login"
      // console.log(this)
      // this.$tool.fetchGet(this.$interface.login).then(res=>{
      //   console.log(res)
      // }).catch(console.log)
    },
  },
};
</script>

<style>
@import "index.css";
.test {
  width: 100%;
  height: 10rem;
}
</style>
