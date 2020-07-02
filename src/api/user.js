import request from '@/utils/request'
import global from '@/utils/global'
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }
export function login(tenantId, username, password, type) {
  return request({
    url:global.blade_auth + '/oauth/token',
    method: 'post',
    headers: {
      'Tenant-Id': "000000",
      'Authorization': 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0'
    },
    params: {
      tenantId,
      username,
      password,
      type,
      grant_type: 'password',
      scope: 'all',
    }
  })
}
export function getInfo(token) {  //获取当前账号的基本信息
  return request({
    url:global.blade_user + '/role-route',
    method: 'get',
    params: { token }
  })
}

export function generateRoutes(params) {  //获取当前账号的菜单
  return request({
    // url: global.blade_user +'/activity-route',
    url:global.blade_system + '/menuCustom/auth-routes',
    method: 'get',
    params
  })
}

export function getAllRoutes(params) { //获取全部的路由地址
  return request({
    url: global.blade_system +'/menuCustom/grant-tree',
    method: 'get',
    params
  })
}
export function setGrant(data) { //设置路由权限
  return request({
    url: global.blade_system +'/menuCustom/grant',
    method: 'post',
    data
  })
}

export function getRoleTreeKeys(params) { //获取路由权限id进行回显使用
  return request({
    url: global.blade_system +'/menuCustom/role-tree-keys',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//获取角色接口
export function getRoleList(params) {
  return request({
    url: global.blade_system +'/role/list',
    method: 'get',
    params
  })
}