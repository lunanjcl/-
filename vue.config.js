// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = { 
  devServer: {
    //proxy: 'http://localhost:7001' ,//反向代理
    proxy: {
      '/': {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        ws: false,
      },
    },
    // host: 'localhost',
    // port: 8080,
    open: true, // 自动打开浏览器
    // disableHostCheck: true, //取消检查host
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";',//全局scss
      }
    }
  },
  configureWebpack: {
    resolve: {extensions: [".ts", ".tsx", ".js", ".json"]},
    module: {
      rules: [
        { test: /.ts$/, loader: "ts-loader" },
      ]
    }
  }
}