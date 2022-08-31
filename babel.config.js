module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { modules: false /* 不要编译成es以外的模块 */ }],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        style: false,
        // styleLibraryName: "theme-chalk",
      },
      'element-ui',
    ],
    [
      'component',
      {
        libraryName: '@gd/elements',
        styleLibraryName: 'theme-chalk',
      },
      '@gd/elements',
    ],
  ],
  env: {
    development: {
      // https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/lazy-loading.html#%E6%96%B0%E6%96%B9%E6%A1%88
      plugins: ['dynamic-import-node'],
    },
  },
}
