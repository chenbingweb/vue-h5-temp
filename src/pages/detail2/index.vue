<template>
  <div>
    hello
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import Tool from "../../libs/Tool";
export default {
  //注册子组件
  components: {},
  data() {
    return {};
  },
  //计算属性
  computed: {
    //  ...mapState('detail/',{
    //     detail: state =>state.detail,
    // }),
    // ...mapGetters('home/',['banner','classify','recommend','indexClassify']),
    name() {
      return this.data;
    },
  },
  //页面创建完成
  created() {},
  //页面加载完成
  mounted() {},
  methods: {
    // ...mapActions('home/',[
    // 'getBanner',
    // 'getClassify',
    // 'getRecommendCourse',
    // 'alertAd',
    // ]),
    // ...mapMutations(['setCategory']),
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
