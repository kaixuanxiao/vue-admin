import { sumReducer } from './array'

/**
 * 求和
 * @param {number[]} nums 数据列表
 */
export function sum(nums) {
  return nums.reduce(sumReducer, 0)
}

/**
 * 求平均数
 * @param {number[]} nums 数据列表
 */
export function avg(nums) {
  if (!nums || nums.length === 0) return 0
  return sum(nums) / nums.length
}

/**
 * 比较数字是否在范围[min, max]内，包含min,max
 * @param {number} value 目标值
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function between(value, min, max) {
  return value >= min && value <= max
}

/**
 * 比较数字是否在范围(min, max)内，不包含min,max
 * @param {number} value 目标值
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function betweenExclude(value, min, max) {
  return value > min && value < max
}
