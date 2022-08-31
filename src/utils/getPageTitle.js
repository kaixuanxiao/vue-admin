import defaultSettings from '@/settings'

const title = defaultSettings.title

/**
 * @param {string} prefix 前缀
 */
export default function getPageTitle(prefix) {
  if (prefix) {
    return `${prefix} - ${title}`
  }
  return `${title}`
}
