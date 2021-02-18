import { request } from "../../request";
// 获取goods list
export function getAndAddGoodsCategoryList(params = "", method = "get", data = "") {
  return request({
    url: "/categories",
    data,
    method,
    params,
  });
}
