import { tool } from "../libs/Tool";
let api = {
  getClassifyList: "/path/class",
};
//获取分类列表
export function getClassifyList(params) {
  // return axios(api.getClassifyList,{...params})
  return tool.fetchPost("/wx/api/get-article-detail", { id });
}
