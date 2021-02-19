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

// 获取商品数据
// 查询信息
// query: "",
// 当前页数
// pagenum: 1,
// 每页显示多少数据
// pagesize: 10,
export function getGoodsList(params) {
  return request({
    url: "/goods",
    params,
  });
}
