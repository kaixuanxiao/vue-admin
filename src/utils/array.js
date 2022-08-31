/**
 * 是否是非空数组
 * @param {Array.<any>} value
 */
export function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0
}

/**
 * 是数组且长度为0
 * @param {Array.<any>} value
 */
export function isEmptyArray(value) {
  return Array.isArray(value) && value.length === 0
}

/**
 * 给 Array.prototype.reduce 使用的累加函数
 */
export const sumReducer = (pre, cur) => pre + cur

/**
 * 打平数组（把多层数组变成一层）
 * @param {Array.<T>} arr
 * @returns {Array.<T>}
 */
export function flatArr(arr) {
  return arr.reduce((pre, item) => {
    Array.isArray(item) ? pre.push(...flatArr(item)) : pre.push(item)
    return pre
  }, [])
}

/**
 * 返回不重复元素组成的数组
 * @param {Array.<T>} arr
 * @returns {Array.<T>}
 */
export function toUniqArr(arr) {
  return [...new Set(arr)]
}

/**
 * 两个数组取交集
 * @param {Array.<T>} a1
 * @param {Array.<T>} a2
 * @returns {Array.<T>}
 */
export function arrIntersection(a1, a2) {
  return a1.filter((item) => a2.includes(item))
}

/**
 * 从一个数组中减去另外一个数组中有的元素，返回结果。不会改变原数组
 * @param {Array} a1
 * @param {Array} a2
 * @returns { Array}
 */
export function arrSubtract(a1, a2) {
  return a1.filter((value) => !a2.includes(value))
}

/**
 * 判断一个数组a1是否包含另外一个数组a2
 * @param {Array} a1
 * @param {Array} a2
 * @returns {boolean}
 */
export function arrContains(a1, a2) {
  return a2.every((value) => a1.includes(value))
}

/**
 * 把数据元素顺序打乱
 * @param {any[]} a
 * @returns {any[]}
 */
export function shuffle(a) {
  const copyA = a.concat()
  for (let i = copyA.length; i; i--) {
    const j = Math.floor(Math.random() * i)
    ;[copyA[i - 1], copyA[j]] = [copyA[j], copyA[i - 1]]
  }
  return copyA
}

/**
 * 从数组删除元素(会删除所有相同的元素)
 * @param {Array.<T>} arr 数组
 * @param {T|() => boolean} item 要删除的元素，或者findIndex的函数
 */
export function removeItem(arr, item) {
  let index
  if (typeof item === 'function') {
    index = arr.findIndex(item)
    while (index !== -1) {
      arr.splice(index, 1)
      index = arr.findIndex(item)
    }
  } else {
    index = arr.indexOf(item)
    while (index !== -1) {
      arr.splice(index, 1)
      index = arr.indexOf(item)
    }
  }
}
