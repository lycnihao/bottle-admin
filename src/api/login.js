import { axios } from '@/utils/request'

export function login (parameter) {
  return axios({
    url: 'http://localhost:8080/api/admin/login',
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
		url: 'http://localhost:8080/api/admin/info',
    /* url: '/user/info', */
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


