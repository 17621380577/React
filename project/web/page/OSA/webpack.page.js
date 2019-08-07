let webpack = require('webpack');
let path =require("path");
module.exports = {
    resolve: {
        alias: {
            "web-OSA-ajax": `${path.resolve(__dirname, 'static/module/ajax.js')}`,  
            "web-OSA-store": `${path.resolve(__dirname, 'mobx')}`,            
            "web-OSA-config": `${path.resolve(__dirname, 'static/module/config.js')}`,  
            "web-OSA-mapping": `${path.resolve(__dirname, 'static/module/mapping.js')}`,  
            "web-OSA-routeEnter": `${path.resolve(__dirname, 'routes/routeEnter.js')}`,
            "web-OSA-loadLang": `${path.resolve(__dirname, 'locales/loader.js')}`,
            "web-OSA-bns": `${path.resolve(__dirname, 'static/module/bns.js')}`,
            "web-OSA-imgs": `${path.resolve(__dirname, 'static/imgs')}`,
            // "web-OSA-mock": `${path.resolve(__dirname, 'mockData')}`,
            // "web-OSA-locales": `${path.resolve(__dirname, 'locales')}`,
            // "web-OSA-components": `${path.resolve(__dirname, 'components')}`
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'webOSARouteEnter': 'web-OSA-routeEnter',
            "webOSALoadLang": "web-OSA-loadLang",
            'webOSAAjax': 'web-OSA-ajax',
            'webOSAConf': 'web-OSA-config',
            'webOSAMap': 'web-OSA-mapping',
            "webOSABns": "web-OSA-bns"
        })
    ]
}