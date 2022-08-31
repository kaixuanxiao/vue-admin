export function toEnNumString(n) {
  const num = Number(n)
  if (!isNaN(num)) {
    return num.toLocaleString('en-US')
  }
  return '0'
}

/**
 *
 * @param {number} value 数值
 * @param {boolean} [withSign=true] 是否添加`%`，默认添加
 */
export function toPercent(value, withSign = true) {
  if (typeof value === 'string') value = Number(value)
  return value * 100 + (withSign && '%')
}

/**
 * 获取指定范围内的整数 [start, end]
 * @param {number} min
 * @param {number} max
 */
export function getIntListOfRange(min, max) {
  if (max < min) {
    throw Error('arguments error, end must not small than start')
  }
  const nums = []
  while (min <= max) {
    nums.push(min)
    min++
  }
  return nums
}
