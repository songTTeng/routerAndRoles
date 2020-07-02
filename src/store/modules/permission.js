import { asyncRoutes, constantRoutes } from '@/router'
import {generateRoutes} from '@/api/user';
import Layout from '@/layout'
const _import = require('../../router/_import_' + process.env.NODE_ENV)//获取组件的方法
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
     //  用到roles
     console.log("thissss",this.getters.roles.join(","),roles)
     let getRoles = roles.join(",")
      generateRoutes({roleIds:getRoles}).then(res => {
      // generateRoutes({userName:'admin'}).then(res => {
        if(res.code == 200){
          let getRouter = []
          let childrenArr = []
          if(res.data && res.data.length !=0){
            res.data.forEach(item=>{
              if(item.children && item.children.length>0){
                item.children.forEach((x,y)=>{
                  childrenArr.push({
                    path: x.path,
                    name: x.name,
                    meta: x.meta,
                    hidden: x.hidden ? true : false, // 不在侧边栏线上
                    component:_import(x.component)   //解决路由不能找到问题
                  })
                })
                getRouter.push({
                  path: item.path,
                  component:Layout,
                  redirect:item.redirect ? item.redirect : null,
                  name: item.name ? item.name : '',
                  alwaysShow: item.alwaysShow ? true : false, // 如果只有一个路由 是否显示下拉箭头
                  meta: item.meta ? item.meta : null,
                  children: childrenArr
                })
              }
            })
          }
          getRouter.push({ path: '*', redirect: '/404', hidden: true })
          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(getRouter, roles)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }else{
          this.$message.error({message:res.msg})
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
