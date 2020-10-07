import { tool  } from "../libs/Tool"
 //获取banner图列表
export function getBanner(info) {
  return tool.fetchGet('/home/get-banner', info||{})
}
//获取banner图列表
export function getClassify() {
    return tool.fetchGet('/home/get-all-category')
}
//获取推荐课程
export function getRecommendCourse(){
    return tool.fetchGet('/home/get-recommend-course')
}
//获取弹窗
export function alertAd(){
  return tool.fetchGet('/home/get-alert-ad')
}