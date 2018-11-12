import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import urlObj from './requireURLs'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: `${process.env.BASE_API}/api/`,
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    // 上传文件时，config.data的数据类型是FormData，
    // qs.stringify(FormData)的结果是空字符串，导致报出上传文件为空的错误
    if (config.method === 'post' && config.data.constructor !== FormData) {
      config.data = qs.stringify(config.data)
    }
    if (store.getters.token) {
      config.headers.common['Auth-Token'] = getToken()
    }
    return config // 一定要return config
  },
  error => {
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  /** response结构
   * {
   *   data: {
   *     code: '', 后台自定义的状态码
   *     data: {}, 后台返回的正确数据
   *     msg: '' 错误信息
   *   },
   *   status: 200, 服务器响应的 HTTP 状态码
   *   statusText: 'OK',
   *   headers: {},
   *   config: {}
   * }
   */
  response => {
    const res = response.data
    // if (response.headers['content-type'].indexOf('application/vnd.ms-excel') !== -1) {
    //   // 返回值是excel，直接下载
    //   let fileName = response.headers['content-disposition'].split('=')[1]
    //   jsd(res, fileName)
    //   return
    // }
    if (res.code === 20000) {
      return res
    } else {
      // 50001:非法的token; 50002:其他客户端登录了; 50003:token过期了;
      if (res.code === 50001 || res.code === 50002 || res.code === 50003) {
        MessageBox.confirm('您已被登出', '提示', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogout').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
  }
)

const ajax = (path, data = {}, options = {}) => {
  let url = path.indexOf('http') === -1 ? path.split('/').reduce((o, k) => {
    return o[k]
  }, urlObj) : path
  let method = options.method || 'post'
  let params = { url, method }

  if (options.method === 'get') {
    Object.assign(params, { params: data }, options)
  } else {
    Object.assign(params, { data }, options)
  }
  return service(params)
}

export default ajax
