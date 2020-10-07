import { tool  } from "../libs/Tool"
 //获取banner图列表
export function getList(info) {
  return tool.fetchPost('/wx/api/get-banner', info)
}