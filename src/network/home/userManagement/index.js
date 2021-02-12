import { request } from "@/network/request";

// querInfo: {
// 查询信息
// query: "",
// 当前页数
// pagenum: 1,
// 每页显示多少数据
// pagesize: 2,
// }
// 获取用户列表数据对象
export function getUserList(querInfo) {
  return request({
    url: "/users",
    params: querInfo,
  });
}

// create_time:
// email: ""
// id: 502
// mg_state: false
// mobile: "1213213123"
// role_name: ""
// username: ""
// 修改用户状态
export function alterUserState(userInfo) {
  return request({
    url: `/users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: "put",
  });
}

// 用户对象信息
// user: {
//   username: "",
//   email: "",
//   mobile: "",
//   password: "",
// },
// 添加用户
export function addUser(user) {
  return request({
    url: "/users",
    data: user,
    method: "post",
  });
}

// 根据id获取用户
export function getIdUser(id) {
  return request({
    url: "/users/" + id,
  });
}

// 通过id修改用户信息
export function alterIdUser(id, data) {
  return request({
    url: "/users/" + id,
    method: "put",
    data: data,
  });
}

// 通过id删除用户
export function deleteUser(id) {
  return request({
    url: "/users/" + id,
    method: "delete",
  });
}
