import types from '../types'

const login = {
  namespace: true,
  state: {
    token: '',
    isLogin: false
  },
  mutations: {
    [types.SAVE_TOKEN] (state, token) {
      console.log('zhixing', token)
      console.log(state)
      state.token = token
    },
    [types.CHANGE_LOGIN] (state, type) {
      state.isLogin = type
    }
  }
}

export default login
