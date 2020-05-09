import { axios } from '@/utils/request'

const baseUrl = '/api/admin'

const sharesApi = {}

sharesApi.query = key => {
	return axios({
	  url: `${baseUrl}/shares/key/${key}`,
	  method: 'get'
	})
}

sharesApi.listAll = () => {
	return axios({
	  url: `${baseUrl}/shares`,
	  method: 'get'
	})
}

sharesApi.sharesAdd = data => {
  return axios({
    url: `${baseUrl}/shares`,
	data: data,
    method: 'put',
	timeout: 600000
  })
}

export default sharesApi
