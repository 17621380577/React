module.exports = [
    Object.assign({
        path: "/",
        breadcrumbName: "OSA",
        getComponent: function (location, cb) {
            require.ensure([], function (require) {
                cb(null, require("./layout/components/index.jsx"))
            }, 'web/OSA/chunk/layout')
        },
        getIndexRoute(nextState, cb) {
            require.ensure([], function (require) {
                cb(null, {
                    breadcrumbName: '欢迎页',
                    component: require("./layout/components/welcome.jsx")
                })
            }, 'web/OSA/chunk/welcome')
        },
        getChildRoutes(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, [
                    require("./SettingCenter"),
                    require("./AssetMgt"),
                ])
            }, 'web/OSA/chunk/routers')
        }
    }, webOSARouteEnter),
    {
        path: "/login",
        getComponent: function (location, cb) {
            require.ensure([], function (require) {
                cb(null, require("./login/components/login.jsx"))
            }, 'web/OSA/chunk/login')
        }
    }
];
