import { request } from "../../request";
// 获取权限列表
export function getRightsList(type) {
  return request({
    url: "/rights/" + type,
  });
}

// 获取所有角色的列表
export function getRolesList() {
  return request({
    url: "/roles",
  });
}

// 根据id删除权限
export function deleteIdRight(roleId, rightId) {
  return request({
    url: `/roles/${roleId}/rights/${rightId}`,
    method: "delete",
  });
}

// 根据roleid修改rights
export function alterIdRights(roleId, data) {
  return request({
    url: `/roles/${roleId}/rights`,
    method: "post",
    data,
  });
}

// 根据user id修改role
export function alterUserIdRole(userId, data) {
  return request({
    url: `/users/${userId}/role`,
    method: "put",
    data,
  });
}
