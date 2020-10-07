///wx/api/get-my-info
import { tool  } from "../libs/Tool"
 //获取 section/info
export function getSectionInfo(id) {
  return tool.fetchGet('/section/info',{course_section_id:id})
}
//记录 section/learn-log
export function sectionLog(info){
  return tool.fetchPost('/section/learn-log',info||{})
}