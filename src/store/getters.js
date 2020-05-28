const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  info: state => state.user.info, //登陆的所有信息
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
