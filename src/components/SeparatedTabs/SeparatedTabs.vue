<script>
import TabNav from 'element-ui/packages/tabs/src/tab-nav.vue'

export default {
  name: 'ElTabs',

  components: {
    TabNav,
  },

  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    beforeLeave: Function,
    stretch: Boolean,
    target: {
      type: [String, Object],
    },
  },

  provide() {
    return {
      rootTabs: this,
    }
  },

  data() {
    return {
      currentName: this.value || this.activeName,
      panes: [],
      // tabPosition属性不再可设置，默认为top
      tabPosition: 'top',
    }
  },

  watch: {
    activeName(value) {
      this.setCurrentName(value)
    },
    value(value) {
      this.setCurrentName(value)
    },
    currentName() {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick(() => {
            this.$refs.nav.scrollToActiveTab()
          })
        })
      }
    },
  },

  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          (vnode) => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElTabPane',
        )
        // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)
        const panesChanged = !(
          panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index])
        )
        if (isForceUpdate || panesChanged) {
          this.panes = panes
        }
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    },
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return
      this.setCurrentName(tabName)
      this.$emit('tab-click', tab, event)
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return
      ev.stopPropagation()
      this.$emit('edit', pane.name, 'remove')
      this.$emit('tab-remove', pane.name)
    },
    handleTabAdd() {
      this.$emit('edit', null, 'add')
      this.$emit('tab-add')
    },
    setCurrentName(value) {
      const changeCurrentName = () => {
        this.currentName = value
        this.$emit('input', value)
      }
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName)
        if (before && before.then) {
          before.then(
            () => {
              changeCurrentName()
              this.$refs.nav && this.$refs.nav.removeFocus()
            },
            () => {
              // https://github.com/ElemeFE/element/pull/14816
              // ignore promise rejection in `before-leave` hook
            },
          )
        } else if (before !== false) {
          changeCurrentName()
        }
      } else {
        changeCurrentName()
      }
    },
  },

  render() {
    const { type, handleTabClick, handleTabRemove, handleTabAdd, currentName, panes, editable, addable, stretch } = this

    const newButton =
      editable || addable ? (
        <span
          class='el-tabs__new-tab'
          on-click={handleTabAdd}
          tabindex='0'
          on-keydown={(ev) => {
            if (ev.keyCode === 13) {
              handleTabAdd()
            }
          }}
        >
          <i class='el-icon-plus'></i>
        </span>
      ) : null

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch,
      },
      ref: 'nav',
    }
    const header = (
      <div class={['el-tabs__header', `is-top`, 'seperated-tabs__header']}>
        {newButton}
        <tab-nav {...navData}></tab-nav>
      </div>
    )
    const panels = <div class='el-tabs__content'>{this.$slots.default}</div>

    return (
      <div
        class={{
          'el-tabs': true,
          'el-tabs--card': type === 'card',
          [`el-tabs--top`]: true,
          'el-tabs--border-card': type === 'border-card',
        }}
      >
        {[header, panels]}
      </div>
    )
  },

  created() {
    if (!this.currentName) {
      this.setCurrentName('0')
    }

    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true))
  },

  mounted() {
    this.calcPaneInstances()
    if (typeof this.target === 'string') {
      const targetEl = document.querySelector(this.target)
      if (targetEl) {
        this.$elHeader = this.$el.children[0]
        targetEl.appendChild(this.$elHeader)
      }
    }
  },

  updated() {
    this.calcPaneInstances()
  },

  destroyed() {
    if (this.$elHeader && this.$elHeader.parentElement) {
      this.$elHeader.parentElement.removeChild(this.$elHeader)
    }
  },
}
</script>

<style lang="scss">
.seperated-tabs__header {
  margin-bottom: 0;
  .el-tabs__nav-wrap {
    display: inline-block;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
  .el-tabs__item {
    padding: 0 10px;
  }
}
</style>
