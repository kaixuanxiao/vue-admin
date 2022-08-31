/**
 * 格式化时间
 * @param {number|Date} date 时间
 * @param {string} format 格式，类似这样'YYYY-MM-DD HH:mm:ss'
 */
export function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  if (!(date instanceof Date)) {
    const time = String(date).length === 10 ? date * 1000 : date * 1
    date = new Date(time)
    // date.setTime()
  }
  const z = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }
  return format.replace(/(Y+|M+|D+|H+|m+|s+)/g, (v) => {
    return String((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-(v.length > 2 ? v.length : 2))
  })
}

/** 格式化时间，精确到日期 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  return formatTime(date, format)
}

/** 格式化时间，精确到分钟数 */
export function formatTime2Minute(date, format = 'YYYY-MM-DD HH:mm') {
  return formatTime(date, format)
}

/**
 * 获取时间过去了多久
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function timePast(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return formatTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
