<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="logoBox">
      <div class="logoBox-logo"><svg-icon icon="golden-cloud" /></div>
      <span class="logoBox-line" />
      <span class="logoBox-name">{{ $store.state.app.title }}</span>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon class="user-avatar head-img-size" icon="avatar-default" />
          <span class="usernamne">{{ name }}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/index">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item style="border-top: 1px solid #eee" @click.native="openPwd">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item style="border-top: 1px solid #eee" @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 修改密码 -->
      <div class="newBox2">
        <el-dialog
          :before-close="confirmToClose"
          :append-to-body="true"
          title=""
          :visible.sync="passVisible"
          width="500px"
          top="200px"
          :show-close="false"
        >
          <span>
            <div class="peopleT padding-bt20 flex flex-between">
              <span class="flex flex-middle">
                <i class="iconfont user-business-f" style="color: #6d99e2" />
                <p>修改密码</p>
              </span>
              <i
                class="el-icon-close"
                style="font-size: 22px; cursor: pointer; line-height: 44px"
                @click="passVisible = false"
              />
            </div>

            <div class="addnewmember p10">
              <div>
                <el-form ref="passForm" :model="passForm" :rules="rules" label-width="80px">
                  <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="passForm.oldPassword" placeholder="请输入旧密码" type="password" />
                  </el-form-item>
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="passForm.newPassword" placeholder="请输入新密码" type="password" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="passForm.confirmPassword" placeholder="请确认密码" type="password" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="customer_rightbtn flex flex-end">
                <el-button @click="passVisible = false">取消</el-button>
                <el-button type="primary" class="greenbgcolor" @click="submitEditPwd">确定</el-button>
              </div>
            </div>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editPwd } from '@/api/user'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },

  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.passForm.newPassword !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      username: '管理员',
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      // 表单校验
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' },
        ],
      },
      passVisible: false,
    }
  },
  computed: {
    ...mapGetters(['userid']),
  },
  watch: {
    '$store.state.user': {
      handler(newName) {
        this.name = newName.name
        this.$forceUpdate()
      },
      immediate: false,
      deep: true,
    },
  },
  created() {
    this.name = this.$store.state.user.name
  },
  methods: {
    confirmToClose(done) {
      this.$confirm('信息未保存,确定要返回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    openPwd() {
      this.passVisible = true
      this.$nextTick(() => {
        this.$refs.passForm.resetFields()
      })
    },
    submitEditPwd() {
      this.$refs.passForm.validate((valid) => {
        if (valid) {
          editPwd({
            userId: this.userid,
            oldPassword: this.passForm.oldPassword,
            newPassword: this.passForm.newPassword,
          }).then((res) => {
            if (res.status === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '修改成功',
              })
              this.passVisible = false
              setTimeout(() => {
                this.logout()
              }, 1000)
            } else {
              this.$message({
                type: 'error',
                message: res.error,
              })
            }
          })
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navbar {
  flex-shrink: 0;
  width: 100%;
  height: $navBarHeight;
  overflow: hidden;
  background: #222d3f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1002;

  .logoBox {
    width: 50%;
    height: 65px;
    display: flex;
    align-items: center;
    margin-left: 22px;
  }
  .logoBox-logo {
    height: 25px;
    width: 111px;
    svg {
      width: inherit;
      height: inherit;
    }
  }
  .logoBox-line {
    width: 1px;
    height: 11px;
    background: #a3abb2;
    margin: 0 12px;
  }
  .logoBox-name {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
  }

  .hamburger-container {
    line-height: $navBarHeight;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    // float: right;
    height: 100%;
    line-height: $navBarHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 38px;

      .avatar-wrapper {
        margin-top: 12px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          & svg {
            width: inherit;
            height: inherit;
          }
        }
        .usernamne {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
          margin-left: 14px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
