import { tool  } from "../libs/Tool"
 //获取cliendId cliendName
export function getClientId(info) {
  return tool.fetchPost('/login/get-client-id', info||{})
}
//登录
export function login(param){
    return tool.fetchPost('/login', param||{})
}
//获取手机验证码
export function getCode(mobile){
    return tool.fetchPost('/member/send-mobile-code',{mobile})
}
//用户注册 /member/verify-mobile-code
export function userSign(info){
  return tool.fetchPost('/member/verify-mobile-code', info||{})
}
//更新用户信息
export function upDateInfo(info){
  return tool.fetchPost('/member/update-info',info||{})
}
//获取用户信息
export function getUserInfo(openid){
  return tool.fetchPost('/login/openid',{openid})
} 
//获取科室列表
export function getDepartment(){
  return tool.fetchPost('/member/interest-department-item',{})
} 
//获取职业列表
export function getJob(){
  return tool.fetchPost('/member/job-item',{})
} 