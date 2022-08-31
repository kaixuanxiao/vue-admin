<template>
  <div class="demo-components">
    <gd-page-header title="组件示例">
      <div id="tabsNav"></div>
      <el-button slot="append" type="primary">append</el-button>
    </gd-page-header>
    <gd-separate-tabs target="#tabsNav" value="tab1">
      <el-tab-pane label="页签1" name="tab1">页签1 内容</el-tab-pane>
      <el-tab-pane label="页签2" name="tab2">页签2 内容</el-tab-pane>
    </gd-separate-tabs>
    <div class="separate-box">以下是非页签内容</div>
    <div>
      <gd-title-row title="标题" subtitle="副标题">
        <el-button slot="append" type="primary" size="small">修改</el-button>
      </gd-title-row>
      <gd-descriptions :items="items" :data="data" item-width="33.3%" label-width="90px" @click-name="onClickName">
        <template #paySwitch>
          <i v-if="data.paySwitch" class="el-icon-check" style="color: #00cd96"></i>
          <i v-else class="el-icon-close"></i>
        </template>
      </gd-descriptions>
    </div>
    <div>
      <el-button type="primary" @click="onRefreshCountData">刷新count</el-button>
      <el-button type="default" @click="onClear">清除选中</el-button>
      <span>当前选中：{{ checkedStatusItem }}</span>
    </div>
    <gd-counted-status-picker
      ref="countedStatusPicker"
      :groups="statusCountGroups"
      :count-data="statusCountInfo"
      @change="onCheckedStatusItemChange"
    />
    <gd-thumbnail-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    <div class="space" />
    <gd-number-info title="统计数据A" value="123.45" />
    <gd-count-down :time="6 * 60 * 1000" multi-segments />
    <div></div>

    <el-button type="primary" @click="dialogVisible = true">打开 Dialog</el-button>
    <gd-dialog
      :visible.sync="dialogVisible"
      title="这是标题"
      title-icon="gd-icon-chart-bar-fill"
      show-confirm-button
      show-cancel-button
      @confirm="onDialogConfirm"
    >
      这是Body
    </gd-dialog>

    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">打开 Drawer</el-button>
    <gd-drawer title="我是外面的 Drawer" :visible.sync="drawer" size="50%">
      <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <gd-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="onInnerDrawerClose"
          :visible.sync="innerDrawer"
        >
          <p>_(:зゝ∠)_</p>
        </gd-drawer>
      </div>
    </gd-drawer>

    <el-button type="primary" style="margin-left: 16px" @click="elDrawer = true">打开 Drawer</el-button>
    <el-drawer title="我是外面的 Drawer" :visible.sync="elDrawer" size="50%">
      <div>
        <el-button @click="innerElDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="onInnerElDrawerClose"
          :visible.sync="innerElDrawer"
        >
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * @type {import('@gd/elements/types/descriptions').DescriptionItem[]}
       */
      items: [
        { label: '门店编号:', valueKey: 'code' },
        { label: '门店名称:', valueKey: 'name', type: 'link' },
        { label: '支付开关:', valueKey: 'paySwitch' },
        { label: '支付渠道:', valueKey: 'payTypeName' },
        { label: '收款人:', valueKey: 'payee', type: 'link', onClick: () => this.$message('点击收款人') },
        { label: '商户手机号:', valueKey: 'cellphone', type: 'phone' },
        { label: '门店地址:', valueKey: 'address' },
        { label: '详细地址:', valueKey: 'addressDetail', width: '66.6%' },
        {
          label: '带图标链接:',
          valueKey: 'linkWithIcon',
          type: 'link',
          prefixIcon: 'el-icon-position',
          onClick: () => this.$message('点击链接'),
        },
        { label: '合同文件', valueKey: 'contractFileName', herfKey: 'contractFileUrl', type: 'file' },
      ],
      data: {
        code: '蔬菜188',
        name: '刘然然蔬果摊',
        paySwitch: true,
        paySwitchName: '开',
        payTypeName: '微信零钱包',
        payee: '刘然然',
        cellphone: '13512345678',
        address: '云南省普洱市',
        addressDetail: '五一农贸市场五一农贸市场五一农贸市场五一农贸市场五一农贸市场',
        linkWithIcon: 'type="link",prefixIcon="el-icon-position"',
        contractFileName: 'type=file合同内容.docx',
        contractFileUrl: 'https://gc365-1258944054.cos.ap-guangzhou.myqcloud.com/eop/20210330/1617089749663.docx',
      },
      /**
       * @type {import('@gd/elements/types/counted-status-picker').CountedStatusGroup[]}
       */
      statusCountGroups: [
        {
          label: '全\n部',
          status: [
            { label: '待报税', value: [1], countKey: 'unTaxAll' },
            { label: '报税完成', value: [2], countKey: 'finishedTax' },
          ],
        },
        {
          label: '零\n申报',
          status: [
            { label: '报税完成', value: 3, countKey: 'finishedTax' },
            { label: '待报税', value: 4, countKey: 'unTax' },
          ],
        },
      ],
      statusCountInfo: {
        unTax: 32,
        finishedTax: 6,
        unTaxAll: 52,
        finishedTaxAll: 8,
      },
      checkedStatusItem: {},
      dialogVisible: false,
      drawer: false,
      innerDrawer: false,
      elDrawer: false,
      innerElDrawer: false,
    }
  },
  methods: {
    onClickName(e) {
      console.log(e)
      this.$message('点击名称')
    },
    onRefreshCountData() {
      this.statusCountInfo = ['unTax', 'unTaxAll', 'finishedTax', 'finishedTaxAll'].reduce(
        (acc, key) => Object.assign(acc, { [key]: Math.floor(Math.random() * 100) }),
        {},
      )
      console.log(this.statusCountInfo)
    },
    onCheckedStatusItemChange(item) {
      this.checkedStatusItem = item
    },
    onClear() {
      this.$refs.countedStatusPicker.clear()
    },
    onDialogConfirm() {
      this.$message('confirm')
      this.dialogVisible = false
    },
    onInnerDrawerClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    onInnerElDrawerClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.demo-components {
  padding: 20px;
  background-color: white;
  font-size: 14px;
}
.space {
  height: 10px;
}
.separate-box {
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: solid 1px rgba($color: #000000, $alpha: 0.05);
}
</style>
