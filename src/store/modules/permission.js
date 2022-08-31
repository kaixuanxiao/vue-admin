import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes 接口返回的路由
 * @param data 前端配置的路由
 */
export function filterAsyncRoutes(routes, data) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    const filterList = data.filter((route) => route.source === tmp.name)
    filterList.length > 0 ? res.push(...filterList) : ''
    const findData = data.find((route) => route.name === tmp.name)
    if (findData) {
      if (tmp.children) {
        findData.children = filterAsyncRoutes(tmp.children, data)
      }
      res.push(findData)
    }
  })
  // 去重排序
  res.sort((before, after) => {
    return before.sort < after.sort
  })
  return res
}

/**
 * 将带有层级和父级的数组转化成树
 * @param menus
 */
function toTree(menus) {
  const result = []
  if (!Array.isArray(menus)) {
    return result
  }
  menus.forEach((item) => {
    delete item.children
  })
  const map = {}
  menus.forEach((item) => {
    map[item.id] = item
  })
  menus.forEach((item) => {
    const parent = map[item.parentId]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 将树状数组转换成数组
 * @param treeData
 */
function treeToArray(data) {
  let treeData = [...data]
  const res = []
  if (!Array.isArray(treeData)) {
    return res
  }
  while (treeData.length > 0) {
    const currentList = treeData
    treeData = []
    currentList.forEach((data) => {
      if (data.children) {
        treeData.push(...data.children)
        delete data.children
      }
      res.push(data)
    })
  }
  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: constantRoutes,
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise((resolve) => {
      // 如果后台接口返回树状结构，直接使用返回数据即可，不需要转换
      const accessedRoutes = filterAsyncRoutes(
        toTree(menus.filter((route) => parseInt(route.hidden) !== 1)),
        treeToArray(asyncRoutes),
      )
      // 增加默认404页面
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
