<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.app-main {
  width: 100%;
  height: 100%;
  padding: 20px 35px;
  position: relative;
  overflow: scroll;
}

.fixed-header + .app-main {
  padding-top: $navBarHeight;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    // padding-right: 15px;
  }
}
</style>
