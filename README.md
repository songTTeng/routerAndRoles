
> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

```bash

# install dependency
npm install

# 如若安装太慢运行如下命令
npm install --registry=https://registry.npm.taobao.org
# develop
npm run dev
```

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

vue.config.js 
   是否规则验证 如不需要设置成false
  lintOnSave: process.env.NODE_ENV === 'development', 
  lintOnSave: false, //是否需要规则
   如需使用mock文件 
   proxy注释即可 
   before放开



  是否需要自动打开浏览器 
  open: false,

  .env.development以及.env.production 
   mock默认是 /dev-api  /prod-api

  VUE_APP_BASE_API = '/api'  修改成项目前缀 dev跟prod 依情况而定

  store == > modules == > permission.js == > generateRoutes 是获取的路由
  router ==> _import_开头的文件  是解决点击路由不存在问题 
