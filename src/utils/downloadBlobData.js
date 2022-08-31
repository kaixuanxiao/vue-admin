/**
 * 处理后台返回数据，在浏览器中下载
 * @param {data} 接口设置 responseType: 'blob', 接收的二进制流的数据
 *  如果接口返回的数据是DOMString（默认）类型 接收的数据 new Blob([`\ufeff${data}`], { type: type })
 * @param {type} 接收文件的类型
 * @param {name} 下载文件时的名称，
 * 下载时需要将main.js中mock的引用删除否则会导致下载文件乱码
 *  const { mockXHR } = require('../mock')
 */

export default function downloadFile(data, type = 'application/octet-stream', name = 'download.xlsx') {
  if ('msSaveOrOpenBlob' in navigator) {
    // ie
    const blob = new Blob([data], { type: type })
    window.navigator.msSaveOrOpenBlob(blob, name)
  } else {
    const url = window.URL.createObjectURL(new Blob([data], { type: type }))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
