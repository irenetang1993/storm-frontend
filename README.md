# cms-github

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for test environment
npm run build:test

# build for production environment
npm run build:prod
```

# 使用scss需要安装node-sass和sass-loader
``` bash
# 安装node-sass可能会因为国内网络环境而失败，所以安装的时候需要指定成淘宝镜像
npm i --save-dev node-sass --sass_binary_site=te=https://npm.taobao.org/mirrors/node-sass/

# node-sass安装失败的原因及解决办法
https://segmentfault.com/a/1190000010984731
```

# 使用svg图标
``` bash
# install svg-sprite-loader
npm i --save-dev svg-sprite-loader

# 配置webpack.base.config.js中的module.rules
加上：
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: [resolve('src/icons')],
  options: {
    symbolId: 'icon-[name]'
  }
}
排除：
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  exclude: [resolve('src/icons')], // 这里需要排除src/icons文件夹
  options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
  }
}

# 参考文档
https://juejin.im/post/59bb864b5188257e7a427c09
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
