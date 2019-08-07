module.exports = Object.assign({
    path: "AutoCollection",
    breadcrumbName: "自动采集",
    getComponent: function (location, cb) {
        require.ensure([], function (require) {
            cb(null, require("./components/AutoCollection.jsx"))
        }, 'web/OSA/chunk/AutoCollection')
    },
}, webOSARouteEnter);