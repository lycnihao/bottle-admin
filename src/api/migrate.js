import { axios } from '@/utils/request'

const baseUrl = '/api/admin/migrations'

const migrateApi = {}

migrateApi.migrate = formData => {
  return axios({
    url: `${baseUrl}/bottle`,
    data: formData,
    method: 'post'
  })
}

export default migrateApi
