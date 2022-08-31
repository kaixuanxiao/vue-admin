<template>
  <div :class="{ 'has-logo': showLogo }" class="pt11">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :isSelected="judgeSelected(activeMenu, route.path)"
        />
      </el-menu>
    </el-scrollbar>
    <div class="toggleSideBar">
      <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  created() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    judgeSelected(activPath, ctPath) {
      if (activPath === '/index') return ctPath === '/'
      const rg = /^\/((\S*))\//
      return ctPath === '/' + activPath.match(rg)[1]
    },
  },
}
</script>
<style lang="scss">
@import '../../../styles/variables.scss';
@import '../../../styles/element-variables.scss';

/* .scrollbar-wrapper .is-active{
  border-right: 4px$--color-primary solid;
  background: rgba(142, 214, 194, 0.19) !important;
} */

.scrollbar-wrapper .nest-menu .router-link-exact-active .is-active {
  border-right-width: 3px;
  border-right-style: solid;
  border-right-color: $--color-primary;
  background-color: rgba(0, 205, 150, 0.1) !important;
  color: $--color-primary !important;
}
.scrollbar-wrapper .nest-menu .el-menu-item {
  padding-left: 62px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-weight: 400 !important;
  color: #666666 !important;
}
.scrollbar-wrapper .submenu-title-noDropdown {
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 500 !important;
  color: #333333 !important;
}
.scrollbar-wrapper .router-link-exact-active .submenu-title-noDropdown {
  border-right-width: 3px;
  border-right-style: solid;
  border-right-color: $--color-primary;
  background-color: rgba(0, 205, 150, 0.1) !important;
  color: $--color-primary !important;
}

.el-menu--popup .nest-menu .is-active {
  border-right-width: 3px;
  border-right-style: solid;
  border-right-color: $--color-primary;
  background-color: rgba(0, 205, 150, 0.1) !important;
  color: $--color-primary !important;
}
.el-menu--popup .nest-menu .el-menu-item {
  padding-left: 30px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 400 !important;
}

.scrollbar-wrapper .el-menu-item {
  padding-left: 30px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 500 !important;
}
.scrollbar-wrapper .el-menu-item {
  padding-left: 30px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 500 !important;
}
.scrollbar-wrapper.el-submenu .el-submenu__title {
  padding-left: 30px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 500 !important;
  color: #333333 !important;
}
.el-submenu .el-submenu__title {
  padding-left: 30px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC !important;
  font-weight: 500 !important;
  color: #333333 !important;
}
.el-menu-item .svg-icon,
.el-submenu__title .svg-icon {
  width: 18px !important;
  height: 18px !important;
}
.el-scrollbar {
  height: calc(100% - 128px) !important;
}
.toggleSideBar {
  width: 200px;
  height: $navBarHeight;
  background: #ffffff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  /* padding-left: 40px; */
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  z-index: 99;
}
.toggleSideBar img {
  width: 22px;
  height: 22px;
}
.pt11 {
  padding-top: 11px;
}
</style>
