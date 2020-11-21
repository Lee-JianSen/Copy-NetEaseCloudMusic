import axios from 'axios'

import Vue from 'vue'
import router from '../router'
import store from '../store'

export function http (config) {
  const instance = axios.create({
    // 跨域请求，使用代理
    // NetEaseCloudMusicApi代表 http://localhost:3000
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000,
    withCredentials: true
  })
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      config.headers.token = store.state.token
      if (
        config.url === 'search/suggest' ||
        config.url === '/resource/like' ||
        // eslint-disable-next-line no-empty
        config.url === '/comment/like') {
      } else {
        Vue.prototype.$toast.loading({
          message: '加载中',
          forbidClick: true,
          duration: 0
        })
      }

      return config
    },
    error => {
      console.log('请求出错' + error)
      Vue.prototype.$toast({
        message: '请求出错',
        forbidClick: true,
        duration: 1000
      })
      return Promise.reject(error.response)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    response => {
      if (response.config.headers.token) {
        store.commit('saveToken', response.config.headers.token)
        store.commit('changeLogin', true)
      }
      Vue.prototype.$toast.clear()
      return response
    },
    error => {
      Vue.prototype.$toast({
        message: '请求出错',
        forbidClick: true,
        duration: 1000
      })
      console.log('响应出错')
      console.dir(error)
      if (error.response.status) {
        console.log('这里')
        switch (error.response.status) {
          case 401:
            store.commit('saveToken', '')
            router.push({
              path: '/login'
            })
            Vue.prototype.$toast('登陆过期')
            break
          case 404:
            Vue.prototype.$toast('请求不存在')
            break
          case 400:
            Vue.prototype.$toast('参数错误')
            break
          case 403:
            Vue.prototype.$toast('没有权限')
            router.go(-1)
            break
          case 301:
            store.commit('saveToken', '')
            Vue.prototype.$toast('请先登录')
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            break
          default:
            console.error(error.response)
        }
        return Promise.reject(error.response)
      }
      // if (error.response) {
      //     if (error.response.status === 404) {
      //         error.message = '请求出错404';
      //         console.log(error.response);
      //         if (error.response.data) Vue.prototype.$toast(error.response.data.message);
      //         return error.message
      //     }
      //     if (error.response.status === 400) console.log('参数错误400');
      //     if (error.response.status === 500) console.log('服务器错误500');
      // } else {
      //     error.message = '连接服务器失败'
      // }
      return error.message
    }
  )
  return instance(config)
}
