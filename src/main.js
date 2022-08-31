import Vue from 'vue'

// import Element from 'element-ui'
import PageHeader from './components/PageHeader/PageHeader.vue'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/errorLog' // error log

import * as filters from './filters' // global filters

import './elementUI'
// 放在Element后面覆盖element默认样式
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/assets/fonts/iconfont.css' // 字体图标
import '@/assets/new-fonts/font-barlow-condensed.css'
import './elementsUI'

// 全局自定义组件
Vue.component(PageHeader.name, PageHeader)

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
