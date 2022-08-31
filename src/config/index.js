import { safeJSONParse } from '@/utils/string'
import deepClone from '@/utils/deepClone'

/**
 * @typedef {Object} EnvConfig 环境变量配置
 * @property {string} BASE_API 基础API地址
 */

const env = deepClone(process.env)
/**
 * @type {EnvConfig} 环境变量
 */
const envConfig = Object.keys(env).reduce((result, key) => {
  const newKey = key.startsWith('VUE_APP_') ? key.substr(8) : key
  const value = env[key]
  const objValue = safeJSONParse(value)
  result[newKey] = objValue === undefined ? value : objValue
  return result
}, {})

// 除环境变量外的其他配置
const config = {
  test: 'test', // TEST 示例配置，无用的
}

/**
 * @type {EnvConfig & typeof config}
 */
export default {
  ...config,
  ...envConfig,
}
