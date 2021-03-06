import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8080', // api base_url
  timeout: 6000, // 请求超时时间
	withCredentials: true
})

/* function setTokenToHeader(config) {
  // set token
  const token = store.getters.token
	console.log(token)
  Vue.$log.debug('Got token from store', token)
  if (token && token.access_token) {
    config.headers['Admin-Authorization'] = token.access_token
  }
} */

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
		if (error.response.status === 400) {
		  notification.error({
		    message: 'Forbidden',
		    description: data.message
		  })
		}
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
   // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
		config.headers['API-Authorization'] = token
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
