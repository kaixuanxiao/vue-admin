## 项目说明

### 简介

项目是 PC 端中后台模板，主要为了快速创建 PC 中后台项目

### 维护人

- 本项目开发者：李凌云 徐纯金 陈孟兰

### 上线版本

| 版本号 | 上线内容     | 开发者 | 上线时间   |
| ------ | ------------ | ------ | ---------- |
| 1.0    | 项目初始上线 | --     | 2020-12-01 |

---

### 技术架构

- 依赖：node.js >=6.11.5
- 开发语言：ES6/Javascript, Sass
- 框架：公司内部框架 vue-admin
- 重大第三方库：

### 目录结构说明

```txt
vue-admin
├── build
│   └── index.js
├── docs                      // docs文档
│   ├── docs
│   └── public
├── public                    // 静态资源
├── mock                      // mock文件目录
├── src
│   ├── api                   // API接口目录
│   ├── App.vue
│   ├── assets                // 资源文件目录
│   ├── components            // 组件目录
│   ├── config                  // 全局配置文件
│   │   └── index.js
│   ├── directive               // 指令目录
│   ├── filters                 // filters
│   │   └── index.js
│   ├── icons                   // 图标目录
│   │   ├── index.js
│   │   ├── svg                 // svg图标目录
│   │   └── login
│   ├── layout                  // 整体布局
│   │   ├── components
│   │   ├── index.vue
│   │   └── mixin
│   │       └── ResizeHandler.js
│   ├── main.js
│   ├── mixins                  // mixins文件目录
│   ├── permission.js
│   ├── router                  // 路由配置
│   │   ├── index.js
│   │   └── modules             // 路由子模块目录
│   ├── settings.js             // 页面运行时显示相关配置
│   ├── store                   // 状态管理
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   ├── styles                  // 样式文件
│   ├── utils                   // 工具
│   │   ├── index.js
│   │   ├── request             // 网络请求封装
│   │   │   ├── config.js
│   │   │   ├── handleError.js
│   │   │   └── index.js
│   └── views                   // 页面
└── vue.config.js
```

### 命名规范

### 目录及文件名

| 规范       | 目录           | 文件                                                                                  |
| ---------- | -------------- | ------------------------------------------------------------------------------------- |
| PascalCase | 组件名的目录名 | 组件 SomeComp.vue                                                                     |
| camelCase  | ---            | 一般 js 文件, index.vue                                                               |
| kebab-case | 一般目录名     | 页面文件 some-page.vue, 资源文件(some-page.html, some-icon.png, element-ui.scss, ...) |

> 为什么组件和页面 vue 文件的命名不同呢？是为了方便使用和重命名。
> ![img](doc/images/use-component-pascalcase.png)
> ![img](doc/images/config-page-route.png)

### 其他命名

查看前端命名规范

## 开发环境配置

如果执行 `install` 命令报如下错误：

```txt
npm ERR! pngquant-bin@6.0.0 postinstall: `node lib/install.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the pngquant-bin@6.0.0 postinstall script.
```

解决办法: 在 `hosts` 文件中添加如下配置

```txt
199.232.28.133 raw.githubusercontent.com
```

### 全局依赖

```bash
npm i -g eslint prettier
```

vscode 插件：

- `ESLint` 代码检查提醒
- `Prettier` 代码格式化（可设置保存自动格式化）
- `koroFileHeader` 自动添加更新文件头注释

### 项目配置项说明

```properties
# env.development
# API接口地址
VUE_APP_BASE_API = '/'
# CDN地址
VUE_APP_CDN = 'https://www.sunniejs.cn/static'
```

### 开发环境启动

```bash
npm run dev
```

### 项目打包

```bash
npm run build:stage  // 测试环境webpack打包
npm run build:prod   // 线上环境webpack打包
```

### 项目打包后预览

```bash
npm run preview
npm run build:prod
npm run build:prod
```

### 项目部署

如果有说明，请在这里描述

### 项目 URL 地址及账号

| 环境 | URL | 账号 | 密码 |
| ---- | --- | ---- | ---- |
| 开发 | xxx | xxx  | xxx  |
| 测试 | xxx | xxx  | xxx  |

### 图标管理及使用

### 使用方式 1（推荐）

1. 新建项目时，直接从 iconfont 官网公共图标库拷贝图标到新项目中
2. 使用`Font Class`模式，更新图标后重新生成 css 文件，复制 url 到项目中，或者把 css 文件内容放到项目中
3. 对于蓝湖设计图中的公共图标，直接复制名字后面的英文名即可使用（会与 iconfont 中相同）
4. 蓝湖设计图中的非公共图标，下载 SVG 后上传到 iconfont 对应项目中使用

> iconfont 权限找各部前端组长或者架构部前端人员
> 命名以小写字母加-组成，命名后缀 `-f` 表示 fill 填充图标。公共图标命名前缀 `gi-` 表示 golden icon，为了避免与其他 class 冲突。

### 使用方式 2

1. 从蓝湖上对应项目中下载 svg 图标到`src/icons/svg`目录下
2. 重命名图标
3. 使用[svgo](https://github.com/svg/svgo)压缩 svg 图片（注意有的 svg 图片可能会被压缩变形）
4. 使用方式：`<svg-icon icon="user" />`

---

### 其它说明
