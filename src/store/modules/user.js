const state = {
  name: '',
  avatar: '',
  introduction: '',
}

const mutations = {
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  // user login
  login() {
    return
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password })
    //     .then((data) => {
    //       resolve()
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    // })
  },

  // get user info
  getInfo({ commit }) {
    commit('SET_NAME', 'name')
    commit('SET_AVATAR', 'avatar')
    commit('SET_INTRODUCTION', 'introduction')
  },

  // user logout
  logout() {
    return
    // return new Promise((resolve, reject) => {
    //   logout(state.token)
    //     .then(() => {
    //       resetRouter()
    //       resolve()
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    // })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
