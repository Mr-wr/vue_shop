import { request } from "../../request";
// 获取订单 list
export function getOrdersList(params = "", method = "get", data = "") {
  return request({
    url: "/orders",
    data,
    method,
    params,
  });
}

// 获取物流进度对话框
export function getAddressInfo(id) {
  return request({
    url: "/kuaidi/" + id,
  });
}
