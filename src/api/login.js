import { axios } from '@/utils/request'

const baseUrl = '/api/admin/'

export function login (parameter) {
  return axios({
    url: `${baseUrl}/login`,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
	url: `${baseUrl}/info`,
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


