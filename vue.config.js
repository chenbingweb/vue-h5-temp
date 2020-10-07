const webpack = require("webpack");
let { AppServer } = require('./server.js')
module.exports = {
    devServer: {
      port: 8080,
      before: function(app, server, compiler) {
        AppServer(app)
      },
      proxy: {
        '/wx/api': {
          target: 'http://jorntest.vipgz1.idcfengye.com/',//'http://127.0.0.1:8080',
          ws: true,
          changeOrigin: true
        },
        '/test':{
            target:'http://easymock.jeemoo.net/mock/5ea6554d9e09c900161da17f/example',//'http://operate.uecchina.com.cn/mock/5e134b35f56a3f7aa9aa04cd/ylzb',
            ws: true,
            changeOrigin: true
        }
       
      }
    },
    // 选项...
    publicPath:"/",
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: (37.5*2)
              })
            ]
          }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            })
        ]
    },
    transpileDependencies: [],
    css: {
        loaderOptions: {
          css: {
            // 这里的选项会传递给 css-loader
            importLoaders: 1,
          }
        }
      }
}