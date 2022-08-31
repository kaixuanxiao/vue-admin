import axios from 'axios'
// import store from '@/store'
import { Loading } from 'element-ui'
import config from './config'
import handleError from './handleError'

const service = axios.create(config.baseConfig)
let loadingInstance

// 请求拦截器
service.interceptors.request.use(
  (options) => {
    options.headers['Access-Token'] = options.token || ''

    return options
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    const code = +data.code

    // TODO 不同项目可能不同
    if (code === 20000) {
      return data.data
    }

    return Promise.reject(response)
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  },
)

/**
 * axios封装
 * @param  {Object} options      axios 的请求参数
 * @return {Promise}             返回一个Promise对象
 */
function request(options = {}) {
  const requestOptions = Object.assign({}, config.defaultOption, options)

  if (requestOptions.beforeSend) {
    requestOptions.beforeSend(requestOptions)
  }
  if (requestOptions.showLoading) {
    // TODO
    loadingInstance = Loading.service({
      lock: false,
      text: '',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  return service(requestOptions)
    .catch((error) => handleError(error, requestOptions))
    .finally(() => {
      // TODO
      loadingInstance && loadingInstance.close()
    })
}

export default request
