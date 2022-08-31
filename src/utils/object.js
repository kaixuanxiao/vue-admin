import { arrSubtract } from './array'

/**
 * 判断是否是对象类型
 * @param {Object} value
 */
export function isObject(value) {
  return value !== null && typeof value === 'object'
}

/**
 * 是否是朴素对象，使用 `Object` constructor或者`[[Prototype]]` 为 `null`的对象创建
 * <br> 如 `{}` , `Object.create(null)`
 * @param {Objec} value
 */
export function isPlainObj(value) {
  if (value === null || typeof value !== 'object') return false
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

/**
 * 克隆对象一部分属性（浅克隆）`includes`和`excludes`只取一个，优先`includes`
 * @param {Object} source 复制源对象
 * @param {string[]|null} [includes] 要复制的属性列表
 * @param {string[]|null} [excludes] 要忽略的属性列表
 * @param {Object} [target] 要复制到的目标对象，不传复制到新对象
 */
export function clonePartial(source, includes = [], excludes = [], target = {}) {
  if (includes && includes.length) {
    return includes.reduce((tar, key) => {
      tar[key] = source[key]
      return tar
    }, target)
  } else {
    return arrSubtract(Object.keys(source), excludes).reduce((tar, key) => {
      tar[key] = source[key]
      return tar
    }, target)
  }
}
