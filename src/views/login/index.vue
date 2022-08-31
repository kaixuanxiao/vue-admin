<template>
  <div class="login-container">
    <img src="@/icons/login/login-bg.png" alt="" class="login_bg" />
    <!-- 登录表单 -->
    <div class="login-form-box">
      <img src="@/icons/login/login-bg-from.png" alt="" class="login_bg_from" />
      <div class="login-form-right">
        <!-- <img src="@/icons/login/login-logo.png" alt="" class="login_title"> -->
        <div class="logoBox">
          <img src="@/icons/login/login-logo.png" alt="" class="login_title" />
          <span class="logoBox-line" />
          <span class="logoBox-name">{{ $store.state.app.title }}</span>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item label="" prop="username">
            <img src="@/icons/login/login-user.png" alt="" class="login-form-icon" />
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入手机号或邮箱地址"
              type="text"
              style="border: none; top: 2px"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <img src="@/icons/login/login-password.png" alt="" class="login-form-icon" />
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              style="border: none; top: 2px"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            style="width: 100%"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (0 && !validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((e) => {
              console.log(e)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .el-form-item__content {
    display: flex;
    align-items: center;
    border-bottom: 1px #dfdfdf solid;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .el-input__inner {
    border: none !important;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    padding: 0 10px !important;
  }
  .el-input__inner::placeholder {
    color: #999;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  height: 100vh;
  width: 100%;
  padding-top: 100px;
  background-color: $bg;
  overflow: hidden;

  .login_bg {
    width: 100%;
    max-height: 100%;
  }
  .login-form-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 32%;
    margin: auto;
    width: 779px;
    height: 518px;
    background: #ffffff;
    box-shadow: 0px 2px 24px 0px #d4d7de;
    display: flex;
    align-items: center;
  }
  .login_bg_from {
    width: 365px;
    height: 518px;
  }
  .login-form-right {
    flex: 1;
    height: 518px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 75px 56px 0 56px;
    box-sizing: border-box;
  }

  .logoBox {
    display: flex;
    align-items: center;
    margin-bottom: 42px;
  }
  .login_title {
    width: 140px;
    height: 31px;
  }
  .logoBox-line {
    width: 2px;
    height: 16px;
    background: #dfe1e3;
    margin: 0 9px 0 10px;
  }
  .logoBox-name {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 22px;
    letter-spacing: 1px;
  }
  .login-form {
    width: 100%;
  }
  .login-form-icon {
    width: 20px;
    height: 20px;
  }
  .login-btn {
    width: 100%;
    height: 40px !important;
    margin-top: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00cd96;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
