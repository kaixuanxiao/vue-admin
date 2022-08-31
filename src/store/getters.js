const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  permission_routes: (state) => state.permission.routes,
  errorLogs: (state) => state.errorLog.logs,
}
export default getters
