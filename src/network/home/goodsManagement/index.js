import { request } from "../../request";
// 获取goods list
export function getGoodsCategoryList(params = "", method = "get", data = "") {
  return request({
    url: "/categories",
    data,
    method,
    params,
  });
}

// 根据分类id获取/添加参数列表
export function getOrAddIdCategoryList(cateID, params, data, method = "get") {
  return request({
    url: "/categories/" + cateID + "/attributes",
    params,
    method,
    data,
  });
}
