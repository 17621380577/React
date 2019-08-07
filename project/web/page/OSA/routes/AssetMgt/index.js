module.exports = Object.assign({
    path: "/AssetMgt",
    breadcrumbName: "资产管理",
    getComponent: function(location, cb) {
        require.ensure([], function(require) {
            cb(null, require('./components/AssetMgt.jsx'))
        }, 'web/OSA/chunk/AssetMgt')
    } // 需求文档上面没有子路由，所以不是getChildRoute
}, webOSARouteEnter);
