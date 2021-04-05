const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: '/', // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) { // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else { // 生产环境配置
    }
    // Object.assign(config, { // 开发生产共同配置
    //     resolve: {
    //         alias: {
    //             '@': path.resolve(__dirname, './src'),
    //             '@c': path.resolve(__dirname, './src/components'),
    //             'vue$': 'vue/dist/vue.esm.js'
    //         }
    //     }
    // })
  },
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: {
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // 注意下面 需要写入接口 ， 如果没有接口则进行注释即可
    proxy: { // 配置跨域
      '/api': {
        target: 'https://imissu.herokuapp.com/api/',	//接口域名
        ws: true,	//是否代理websockets
        changOrigin: true,	//是否跨域
        pathRewrite: {		//重置路径
          '^/api': ''
        }
      }
    },
    before: app => { }
  }
}

