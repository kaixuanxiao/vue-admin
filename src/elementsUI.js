import Vue from 'vue'
import {
  Icon,
  PageHeader,
  SeparateTabs,
  TitleRow,
  Descriptions,
  CountedStatusPicker,
  ThumbnailImage,
  NumberInfo,
  Dialog,
  Drawer,
  Timeline,
  GoodsPreviewer,
  RelativeTime,
  CountDown,
  CountUp,
} from '@gd/elements'

Vue.use(Icon)
Vue.use(PageHeader)
Vue.use(SeparateTabs)
Vue.use(TitleRow)
Vue.use(Descriptions)
Vue.use(CountedStatusPicker)
Vue.use(ThumbnailImage)
Vue.use(NumberInfo)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(Timeline)
Vue.use(GoodsPreviewer)
Vue.use(RelativeTime)
Vue.use(CountDown)
Vue.use(CountUp)

Descriptions.registerType('phone', function (h, ctx, item) {
  const maskKey = `${item.valueKey}$mask`
  if (!(maskKey in ctx.data)) {
    ctx.$set(ctx.data, maskKey, true)
  }
  const onClick = () => {
    ctx.data[maskKey] = !ctx.data[maskKey]
  }
  let value = item?.value ?? ctx.data[item.valueKey] ?? ctx.placeholder ?? ''
  if (ctx.data[maskKey]) {
    value = value.substr(0, 3) + '****' + value.substr(7)
  }
  return h('span', {}, [h('i', { class: 'el-icon-view', style: { cursor: 'pointer' }, on: { click: onClick } }), value])
})
