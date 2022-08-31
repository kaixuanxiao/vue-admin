// 根据环境不同引入不同api地址
import config from '@/config'

export default {
  baseConfig: {
    baseURL: config.BASE_API, // 基础请求地址 完整url = BASE_API url + request url
    timeout: 30000, // 超时时间
  },
  defaultOption: {
    // 请求默认参数
    method: 'get',
    showError: true, // 是否弹窗显示错误，如果false则接口自己在catch中处理错误逻辑
    showLoading: false, // 是否显示 loading
    beforeSend: null, // request 前执行的操作
  },
}
