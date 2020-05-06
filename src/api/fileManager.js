import Vue from 'vue'
import { axios } from '@/utils/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'



const baseUrl = '/api/admin/fileManager'

const uploadUrl = '/api/admin/uploader'

const fileManagerApi = {}

fileManagerApi.getAttrUrl = () => {
	return '/upload/'
}

fileManagerApi.fileChunk = () => {
	const token = Vue.ls.get(ACCESS_TOKEN)
	return uploadUrl + '/chunk?API-Authorization=' + token
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

fileManagerApi.mergeFile = (params) => {
  return axios({
    url: `${uploadUrl}/mergeFile`,
    data: params, 
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
