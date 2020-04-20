import { axios } from '@/utils/request'

const bottleUrl = 'http://localhost:8080/'

const baseUrl = bottleUrl + 'api/admin/fileManager'

const fileManagerApi = {}

fileManagerApi.getAttrUrl = () => {
	return bottleUrl + '/upload/'
}

fileManagerApi.query = params => {
  return axios({
    url: `${baseUrl}/list`,
    params: params,
    method: 'get'
  })
}

fileManagerApi.createFolder = params => {
  return axios({
    url: `${baseUrl}/createFolder`,
    params: params,
    method: 'put'
  })
}

fileManagerApi.rename = params => {
  return axios({
    url: `${baseUrl}/rename`,
    params: params,
    method: 'put'
  })
}

fileManagerApi.folderNode = params => {
  return axios({
    url: baseUrl + '/folderNode',
		params: params,
    method: 'get'
  })
}

fileManagerApi.copy = params => {
  return axios({
    url: `${baseUrl}/copy`,
    params: params,
    method: 'post'
  })
}

fileManagerApi.move = params => {
  return axios({
    url: `${baseUrl}/move`,
    params: params,
    method: 'post'
  })
}

fileManagerApi.remove = params => {
  return axios({
    url: `${baseUrl}/remove`,
    params: params,
    method: 'post'
  })
}

fileManagerApi.upload = (formData, uploadProgress, cancelToken) => {
  return axios({
    url: `${baseUrl}/upload`,
    timeout: 8640000, // 24 hours
    data: formData, // form data
    /* onUploadProgress: uploadProgress, */
    cancelToken: cancelToken,
    method: 'post'
  })
}

export default fileManagerApi
