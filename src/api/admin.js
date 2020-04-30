import { axios } from '@/utils/request'

const baseUrl = 'http://localhost:8080/api/admin'

const adminApi = {}

adminApi.isInstalled = () => {
  return axios({
    url: `${baseUrl}/is_installed`,
    method: 'get'
  })
}

adminApi.install = data => {
  return axios({
    url: `${baseUrl}/installations`,
    data: data,
    method: 'post'
  })
}

adminApi.login = (username, password) => {
  return axios({
    url: `${baseUrl}/login`,
    data: {
      username: username,
      password: password
    },
    method: 'post'
  })
}

adminApi.logout = () => {
  return axios({
    url: `${baseUrl}/logout`,
    method: 'post'
  })
}
export default adminApi
