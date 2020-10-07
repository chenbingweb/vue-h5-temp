import { tool  } from "../libs/Tool"
 //获取课程详情
export function getDetail(id) {

  return tool.fetchGet('/course/info', {course_id:id})
}
//查询课程是否购买course/query-pay-status
export function queryPayStatus(info){
  return tool.fetchPost('/course/query-pay-status',info||{})
}
//支付
export function pay(id){
  return tool.fetchPost('/course/buy',{course_id:id})
}