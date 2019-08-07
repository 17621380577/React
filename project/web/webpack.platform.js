function loadPlatformConf(envConf) {
    let webpack = require('webpack');
    let merge = require("webpack-merge");
    let path =require("path");    
    let platformConf = {};
    //获取待编译的页面列表
    let pageList = envConf['deployContent']['web'].length > 0 ? envConf['deployContent']['web'] : require(`./platformConf.json`)["pageList"];
    let pageConf = {};
    pageList.map(pageName => {
        pageConf = merge(pageConf, require(`./page/${pageName}/webpack.page.js`));
    })
    platformConf = merge({
        resolve: {
            alias: {
                "web-commonTable": `${path.resolve(__dirname, "common/commonComponent/commonTable.jsx")}`,
                'web-mobx': `${path.resolve(__dirname, "common/mobx")}`,
                "web-locales": `${path.resolve(__dirname, "common/locales")}`,
                "web-commonDashboard": `${path.resolve(__dirname, "common/commonDashboard")}`,
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                'WebCommonTable': 'web-commonTable'
            })
        ]
    }, pageConf);
    return platformConf;
}

module.exports = loadPlatformConf;