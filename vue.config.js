const path = require('path');

function resolve(dirname) { //node课程第一天 path模块
    return path.resolve(dirname)
}

module.exports = {
    lintOnSave: false,
    publicPath: "./",

    //只要配置了vue.config.js 那么就一定要重启项目! 一定要重启项目!  一定要重启项目! 

    chainWebpack: (config) => {
        config.resolve.alias
            .set('$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('pages', resolve('src/pages'))
            .set('router', resolve('src/router'))
            .set('api', resolve('src/api'))
    },

    devServer: {
        // port: 3000,//设置项目的端口号
        // host: "10.0.5.224",//设置某个主机才能访问
        proxy: {//代理
            // "http://localhost:80801/api/data/index.json"
            "/api": {
                target: process.env.VUE_APP_BASE_URL,//当路径以/api开头的时候,会将/api替换成target中的地址
                pathRewrite: { //路径重写
                    "^/api": ""
                }
            },
            // "/users": {
            //     target: "http://chst.vip"
            // }
        }
    },
};
