import { MessageBox } from 'element-ui'

const defaultErrorMessage = '系统出错了，请稍候重试'

/**
 * 封装错误对象
 * @param {String} 错误信息
 */
function wrap(errorMessage) {
  return { message: errorMessage }
}

/**
 * 请求未发出，如：
 * 1. interceptors.request拦截器reject的错误
 * 2. 跨域请求，在OPTIONS请求出错后，真实的请求将不会发送，会直接报错
 * 3. 请求地址错误
 * 4. 其它未知情况
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleRequestError(error) {
  console.error('handleRequestError', error)
  let reason
  const errorMessage = error.message

  if (errorMessage === 'Network Error') {
    // Axios.onerror 拦截后，统一返回 Network Error
    reason = wrap('网络开小差了，请稍候重试')
  } else if (errorMessage && errorMessage.indexOf('timeout of') !== -1) {
    // 请求超时
    reason = wrap('请求超时了，请稍候重试')
  } else {
    reason = error
  }

  return reason
}

/**
 * 请求已发出，但http状态码不为2xx的错误
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleResponseError(error) {
  console.error('handleResponseError', error)
  const status = error.response.status

  if (status === 401 || status === 403) {
    // TODO token失效
    // handleLogout(status)

    return null
  }
  return wrap(`[${status}]${defaultErrorMessage}`)
}

/**
 * 业务异常，由interceptors.response拦截器reject的错误
 *
 * @param  {Object} error 错误对象
 * @return {Object}       返回包装后的错识信息对象，如 { message: '' }
 */
function handleServiceError(error) {
  // data 为服务器端返回的报文
  const data = error.data || {}

  // 未实名认证
  if (+data.code === 2000) {
    // TODO
    return null
  }

  return data
}

/**
 * 异常处理
 * @param  {Object} error        错误对象
 * @param  {Boolean} showError   是否显示错误
 * @return {Promise}             返回一个异常处理的promise对象
 */
export default function handleError(error, requestOptions) {
  let reason

  if (error.response) {
    reason = handleResponseError(error)
  } else if (error.status >= 200 && error.status < 300) {
    // 特殊code码，由各自控制台处理异常
    if (+error.data.code === 3000) {
      return Promise.reject(error.data)
    }
    reason = handleServiceError(error)
  } else {
    reason = handleRequestError(error)
  }

  if (reason && requestOptions.showError) {
    // TODO
    MessageBox.alert(reason.message || reason, '提示', {
      type: 'error',
      showClose: false,
    })
  }

  return Promise.reject(reason)
}
