function loadProjectConf(envConf) {
    let path = require('path');    
    let webpack = require('webpack');
    let merge = require("webpack-merge");
    let projectName = envConf.projectName;
    let projectConf = {};
    //基础配置文件
    let bascConf = require(`${process.cwd()}/build/env/webpack.base.js`);
    let platformConf = {};
    let platformList = Object.keys(envConf.deployContent);
    //提取平台相关的配置文件
    platformList.map(platformName => {
        platformConf = merge(platformConf, require(`./${platformName}/webpack.platform.js`)(envConf));
    })
    console.log("this is project")
    let commonEntry = {entry :{}};
    //合并两端配置文件
    projectConf = merge(bascConf, {
        ...commonEntry,
        //项目通用配置（移动端和pc端共享）
        resolve: {
            alias: {
                'buildConf': `${process.cwd()}/build/config`,
                'osa-common': `${path.resolve(__dirname, "common/module/common.js")}`, 
                'osa-websocket': `${path.resolve(__dirname, "common/module/websocket.js")}`,
                'buildConf': `${process.cwd()}/build/config`
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                'osaCommon': 'osa-common',
                "osaWebSocket": "osa-websocket"
            })
        ]
    }, platformConf);
    return projectConf;
}

module.exports = loadProjectConf;
