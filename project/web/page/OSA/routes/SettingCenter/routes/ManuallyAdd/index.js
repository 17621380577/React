module.exports = Object.assign({
    path: "ManuallyAdd",
    breadcrumbName: "手动添加",
    getComponent: function (location, cb) {
        require.ensure([], function (require) {
            cb(null, require("./components/ManuallyAdd.jsx"))
        }, 'web/OSA/chunk/ManuallyAdd') 
    },
}, webOSARouteEnter);