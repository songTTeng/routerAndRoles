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
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function getInfo(token) {
  return request({
    url:global.blade_user + '/role-route',
    method: 'get',
    params: { token }
  })
}

export function generateRoutes(params) {
  return request({
    url: global.blade_user +'/activity-route',
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

